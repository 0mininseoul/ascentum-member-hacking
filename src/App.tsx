import React, { useState } from 'react';
import { teamMembers, TeamMember } from './data/teamMembers';
import MemberCard from './components/MemberCard';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-castleton-green text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">어센텀 멤버 해킹</h1>
          <p className="text-green-100">팀원들의 성격을 이해하고, AI로 대화해보세요</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Team Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">팀 구성원</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onChatClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>

        {/* Role Recommendations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">역할 추천</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-4 border-castleton-green pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">박영민 (CEO)</h3>
                <p className="text-gray-600 mb-2"><span className="font-semibold">MBTI:</span> INTP - 창조형/긍정형</p>
                <p className="text-gray-700">
                  <span className="font-semibold text-castleton-green">추천 역할:</span>
                  혁신 전략가, 제품 비전 설계자. 논리적 분석과 창의적 아이디어로 회사의 방향성을 제시하는 역할에 최적화되어 있습니다.
                </p>
              </div>

              <div className="border-l-4 border-castleton-green pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">이승호 (Developer)</h3>
                <p className="text-gray-600 mb-2"><span className="font-semibold">MBTI:</span> INTJ - 긍정형/연구형</p>
                <p className="text-gray-700">
                  <span className="font-semibold text-castleton-green">추천 역할:</span>
                  시스템 아키텍트, 기술 리드. 체계적인 시스템 구축과 효율적인 개발 프로세스를 통해 기술적 우수성을 달성합니다.
                </p>
              </div>

              <div className="border-l-4 border-castleton-green pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">이시원 (Marketing)</h3>
                <p className="text-gray-600 mb-2"><span className="font-semibold">MBTI:</span> ESTJ - 성과형/규칙형</p>
                <p className="text-gray-700">
                  <span className="font-semibold text-castleton-green">추천 역할:</span>
                  마케팅 전략 실행 책임자. 명확한 목표 설정과 강력한 실행력으로 성과를 창출하는 역할에 적합합니다.
                </p>
              </div>

              <div className="border-l-4 border-castleton-green pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">이승훈 (Finance/Design)</h3>
                <p className="text-gray-600 mb-2"><span className="font-semibold">MBTI:</span> ESTJ - 주도형/성과형</p>
                <p className="text-gray-700">
                  <span className="font-semibold text-castleton-green">추천 역할:</span>
                  프로젝트 리더, 운영 책임자. 주도적인 리더십과 빠른 의사결정으로 팀을 이끌고 목표를 달성합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Synergy Tips */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">팀워크 향상 팁</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-castleton-green text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">INTP(박영민) ↔ INTJ(이승호)</h3>
                  <p className="text-gray-700">
                    둘 다 논리적이고 분석적인 성향으로 깊이 있는 토론이 가능합니다.
                    박영민은 창의적 아이디어를, 이승호는 실행 가능한 시스템으로 구체화하는 시너지를 발휘합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-castleton-green text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">ESTJ(이시원, 이승훈) - 실행의 파워하우스</h3>
                  <p className="text-gray-700">
                    이시원과 이승훈은 모두 ESTJ로 목표 지향적이고 실행력이 강합니다.
                    이시원은 성과형으로 마케팅 전략 실행에, 이승훈은 주도형으로 리더십을 발휘하여 팀을 이끕니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-castleton-green text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">내향형 ↔ 외향형 밸런스</h3>
                  <p className="text-gray-700">
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
      <footer className="bg-gray-800 text-white mt-20 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 어센텀 팀원들 성격 분석 | Made with ❤️ by Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
