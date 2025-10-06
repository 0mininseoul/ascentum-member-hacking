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
      className="card-hover-effect bg-white rounded-2xl shadow-xl overflow-visible group animate-scaleIn relative z-20"
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 그라데이션 헤더 */}
      <div className="relative h-40 bg-gradient-to-br from-castleton-green via-green-600 to-emerald-700 gradient-animate overflow-hidden rounded-t-2xl">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-y-12 -translate-x-12"></div>
        </div>

        {/* 인스타그램 배지 */}
        <div className="absolute top-4 left-4 z-10">
          <a
            href={`https://instagram.com/${member.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30 hover:bg-white/30 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@{member.instagram}</span>
          </a>
        </div>

        {/* MBTI 배지 */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
            {member.mbti}
          </span>
        </div>
      </div>

      {/* 아바타 - 헤더의 형제 요소로 이동 */}
      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-12 z-50">
        <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-2xl transition-transform duration-300 overflow-hidden ${isHovered ? 'scale-110 rotate-6' : ''}`}>
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
