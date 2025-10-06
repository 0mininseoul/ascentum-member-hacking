import React, { useState } from 'react';
import { TeamMember } from '../data/teamMembers';

interface MemberCardProps {
  member: TeamMember;
  onChatClick: () => void;
  index: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onChatClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 각 카드마다 다른 애니메이션 지연
  const animationDelay = `${index * 150}ms`;

  return (
    <div
      className="card-hover-effect bg-white rounded-2xl shadow-xl overflow-hidden group animate-scaleIn"
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 그라데이션 헤더 */}
      <div className="relative h-40 bg-gradient-to-br from-castleton-green via-green-600 to-emerald-700 gradient-animate overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* 아바타 */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`w-24 h-24 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-2xl transition-transform duration-300 overflow-hidden ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            <img 
              src={`/images/${member.id}.jpg`}
              alt={member.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // 이미지 로드 실패 시 첫 글자 표시
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-4xl font-black text-castleton-green">${member.name[0]}</span>`;
                }
              }}
            />
          </div>
        </div>

        {/* MBTI 배지 */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
            {member.mbti}
          </span>
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="pt-16 pb-6 px-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{member.name}</h3>
          <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-castleton-green rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-castleton-green">
              {member.symoffice.primary}
            </span>
          </div>
        </div>

        {/* 주요 강점 */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">강점</h4>
          <div className="space-y-2">
            {member.personality.strengths.slice(0, 2).map((strength, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 animate-fadeInUp"
                style={{ animationDelay: `${(index * 150) + (idx * 100)}ms` }}
              >
                <div className="w-1.5 h-1.5 bg-castleton-green rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-700 leading-snug">
                  {strength.length > 25 ? strength.substring(0, 25) + '...' : strength}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI 대화 버튼 */}
        <button
          onClick={onChatClick}
          className="w-full bg-gradient-to-r from-castleton-green to-green-700 hover:from-green-700 hover:to-castleton-green text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ripple group"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>AI와 대화하기</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
