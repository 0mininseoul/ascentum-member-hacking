import React from 'react';
import { TeamMember } from '../data/teamMembers';

interface MemberCardProps {
  member: TeamMember;
  onChatClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onChatClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-castleton-green to-green-700 h-32 relative">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-castleton-green border-4 border-white shadow-lg">
            {member.name[0]}
          </div>
        </div>
      </div>

      <div className="pt-14 pb-6 px-6">
        <h3 className="text-xl font-bold text-gray-800 text-center mb-1">{member.name}</h3>
        <p className="text-sm text-gray-500 text-center mb-4">{member.role}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-600">MBTI</span>
            <span className="text-sm font-bold text-castleton-green">{member.mbti}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-600">Symoffice</span>
            <span className="text-sm font-bold text-castleton-green">{member.symoffice.primary}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-600 mb-2">주요 강점</h4>
          <div className="flex flex-wrap gap-1">
            {member.personality.strengths.slice(0, 2).map((strength, index) => (
              <span
                key={index}
                className="text-xs bg-green-50 text-castleton-green px-2 py-1 rounded-full"
              >
                {strength.length > 15 ? strength.substring(0, 15) + '...' : strength}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onChatClick}
          className="w-full bg-castleton-green hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          AI 대화 시작
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
