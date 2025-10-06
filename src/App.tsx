import React, { useState, useEffect } from 'react';
import { teamMembers, TeamMember } from './data/teamMembers';
import MemberCard from './components/MemberCard';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // 스크롤 애니메이션 옵저버
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-castleton-green via-green-700 to-emerald-800 text-white overflow-hidden gradient-animate z-10">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full translate-y-40 -translate-x-40"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight">
              어센텀 멤버 해킹
            </h1>
            <p className="text-xl md:text-2xl text-green-100 font-medium mb-8">
              팀원들의 성격을 이해하고, AI로 대화해보세요 🚀
            </p>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border-2 border-white/40 px-8 py-4 rounded-full shadow-lg hover:bg-white/30 transition-all">
              <div className="flex -space-x-2">
                {teamMembers.slice(0, 4).map((member, idx) => (
                  <div
                    key={member.id}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-3 border-white shadow-md overflow-hidden"
                    style={{ zIndex: 4 - idx }}
                  >
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
                          parent.innerHTML = `<span class="text-castleton-green font-black text-base">${member.name[0]}</span>`;
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
              <span className="text-base font-bold text-white">4명의 팀원과 만나보세요</span>
            </div>
          </div>
        </div>

        {/* 웨이브 효과 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 -mt-8 relative z-0">
        {/* Team Overview Section */}
        <section className="mb-20 scroll-reveal">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              팀 구성원
            </h2>
            <p className="text-lg text-gray-600">
              각 팀원의 성격과 강점을 살펴보고, AI와 대화해보세요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                onChatClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>

        {/* Team Collaboration Section */}
        <section className="mb-20 scroll-reveal">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              팀 협업 역할
            </h2>
            <p className="text-lg text-gray-600">
              각 팀원의 성격에 맞는 협업 방식을 확인하세요
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border-2 border-transparent hover:border-castleton-green transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-castleton-green rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/park-young-min.jpg"
                      alt="박영민"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '박';
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">박영민</h3>
                    <p className="text-sm text-gray-600 mb-3">INTP · 창조형/긍정형</p>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-castleton-green">아이디어 제안자 & 전략적 분석가</span><br />
                      논리적 분석과 창의적 아이디어로 팀의 방향성을 제시하고, 복잡한 문제에 대한 혁신적인 해결책을 도출
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-transparent hover:border-castleton-green transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-castleton-green rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/lee-seung-ho.jpg"
                      alt="이승호"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '승호';
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">이승호</h3>
                    <p className="text-sm text-gray-600 mb-3">INTJ · 긍정형/연구형</p>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-castleton-green">시스템 설계자 & 실행 계획가</span><br />
                      체계적인 계획 수립과 효율적인 실행으로 아이디어를 현실화하고, 장기적 비전을 구체적인 단계로 구현
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border-2 border-transparent hover:border-castleton-green transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-castleton-green rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/lee-si-won.jpg"
                      alt="이시원"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '시원';
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">이시원</h3>
                    <p className="text-sm text-gray-600 mb-3">ESTJ · 성과형/규칙형</p>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-castleton-green">목표 달성자 & 품질 관리자</span><br />
                      명확한 목표 설정과 강력한 실행력으로 팀의 성과를 극대화하고, 체계적인 프로세스로 품질 보장
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-white border-2 border-transparent hover:border-castleton-green transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-castleton-green rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/lee-seung-hoon.jpg"
                      alt="이승훈"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '승훈';
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">이승훈</h3>
                    <p className="text-sm text-gray-600 mb-3">ESTJ · 주도형/성과형</p>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-castleton-green">비즈니스 전략가 & 실행 추진자</span><br />
                      창업과 투자에 대한 열정으로 비즈니스 전략을 수립하고, 빠른 의사결정으로 도전적인 목표를 향해 강한 추진력을 발휘
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Synergy Tips */}
        <section className="scroll-reveal">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              팀워크 향상 팁
            </h2>
            <p className="text-lg text-gray-600">
              팀원 간의 시너지를 극대화하는 협업 전략
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-castleton-green to-green-700 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">INTP(박영민) ↔ INTJ(이승호)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    둘 다 논리적이고 분석적인 성향으로 깊이 있는 토론이 가능합니다.
                    박영민은 창의적 아이디어를, 이승호는 실행 가능한 시스템으로 구체화하는 시너지를 발휘합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-castleton-green to-green-700 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">ESTJ(이시원, 이승훈) - 실행의 파워하우스</h3>
                  <p className="text-gray-700 leading-relaxed">
                    이시원과 이승훈은 모두 ESTJ로 목표 지향적이고 실행력이 강합니다.
                    이시원은 성과형으로 마케팅 전략 실행에, 이승훈은 주도형으로 리더십을 발휘하여 팀을 이끕니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-castleton-green to-green-700 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">내향형 ↔ 외향형 밸런스</h3>
                  <p className="text-gray-700 leading-relaxed">
                    박영민, 이승호(내향형)는 깊이 있는 분석과 전략을, 이시원, 이승훈(외향형)은 실행과 대외 커뮤니케이션을 담당하여
                    완벽한 균형을 이룹니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Chatbot Modal */}
      {selectedMember && (
        <ChatBot
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-castleton-green text-white mt-32 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full -translate-y-32"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full translate-y-24"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">어센텀 멤버 해킹</h3>
            <p className="text-gray-300 mb-6">
              팀원의 성격을 이해하고 더 나은 협업을 만들어가세요
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">4</div>
                <div className="text-sm text-gray-400">팀원</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">3</div>
                <div className="text-sm text-gray-400">MBTI 유형</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">∞</div>
                <div className="text-sm text-gray-400">시너지</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 어센텀 팀원들 성격 분석 | Made with 💚 by Claude Code
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
