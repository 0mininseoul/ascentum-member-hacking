import React, { useState, useRef, useEffect } from 'react';
import { TeamMember } from '../data/teamMembers';
import { supabase } from '../lib/supabase';

interface ChatBotProps {
  member: TeamMember;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ member, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `안녕하세요 ${member.name}님! 저는 당신의 AI 비서입니다. 무엇을 도와드릴까요?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채팅 세션 생성
  useEffect(() => {
    const createSession = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_chat_sessions')
          .insert({
            member_id: member.id,
            member_name: member.name,
          })
          .select()
          .single();

        if (error) {
          console.error('세션 생성 오류:', error);
        } else if (data) {
          setSessionId(data.id);
        }
      } catch (error) {
        console.error('세션 생성 실패:', error);
      }
    };

    createSession();
  }, [member.id, member.name]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = { role: 'user', content: input };
    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 사용자 메시지를 DB에 저장
      await supabase.from('ai_chat_messages').insert({
        session_id: sessionId,
        role: 'user',
        content: userInput,
      });

      // Supabase Edge Function 호출 (OpenAI API를 백엔드에서 호출)
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          memberId: member.id,
          memberName: member.name,
          systemPrompt: member.systemPrompt,
        },
      });

      if (error) {
        console.error('Edge Function 오류:', error);
        throw error;
      }

      if (data && data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // AI 응답을 DB에 저장
        await supabase.from('ai_chat_messages').insert({
          session_id: sessionId,
          role: 'assistant',
          content: data.message,
        });

        // 세션 메시지 카운트 업데이트
        await supabase
          .from('ai_chat_sessions')
          .update({ 
            message_count: messages.length + 2,
            session_end: new Date().toISOString(),
          })
          .eq('id', sessionId);
      } else {
        throw new Error(data?.error || 'AI 응답 오류');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-castleton-green to-green-700 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{member.name}님의 AI 비서</h2>
              <p className="text-green-100 text-sm">{member.mbti} · {member.symoffice.primary}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-castleton-green text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-castleton-green"
              disabled={isLoading || !sessionId}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || !sessionId}
              className="bg-castleton-green hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
