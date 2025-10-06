# 어센텀 멤버 해킹 👥

팀원들의 성격을 분석하고 AI와 대화할 수 있는 인터랙티브 웹사이트입니다.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## 🌟 주요 기능

- **팀원 성격 분석**: MBTI와 Symoffice 유형을 기반으로 4명의 팀원 성격 분석
- **AI 챗봇**: OpenAI GPT-4를 활용한 각 팀원과의 실시간 대화
- **역할 추천**: 각 팀원에게 최적화된 역할 제안
- **팀워크 가이드**: 팀원 간 시너지를 극대화하는 협업 전략 제공
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원

## 🎨 디자인 특징

- **현대적인 UI/UX**: Tailwind CSS를 활용한 깔끔하고 모던한 디자인
- **부드러운 애니메이션**: 스크롤 애니메이션, 카드 호버 효과, 그라데이션 효과
- **직관적인 인터페이스**: 사용자 친화적인 레이아웃과 네비게이션
- **커스텀 컬러**: 어센텀 브랜드 컬러(Castleton Green) 적용

## 📊 팀원 구성

| 이름 | 역할 | MBTI | Symoffice | 특징 |
|------|------|------|-----------|------|
| 박영민 | CEO | INTP | 창조형/긍정형 | 혁신 전략가, 제품 비전 설계자 |
| 이승호 | Developer | INTJ | 긍정형/연구형 | 시스템 아키텍트, 기술 리드 |
| 이시원 | Marketing | ESTJ | 성과형/규칙형 | 마케팅 전략 실행 책임자 |
| 이승훈 | Finance/Design | ESTJ | 주도형/성과형 | 프로젝트 리더, 운영 책임자 |

## 🛠️ 기술 스택

### Frontend
- **React 19.2.0**: 최신 React 기능 활용
- **TypeScript 4.9.5**: 타입 안정성 보장
- **Tailwind CSS 4.1.14**: 유틸리티 기반 스타일링
- **OpenAI API**: GPT-4 기반 AI 챗봇

### Development Tools
- **Create React App**: 프로젝트 부트스트래핑
- **ESLint**: 코드 품질 관리
- **Git**: 버전 관리

### Deployment
- **Vercel**: 자동 CI/CD 배포
- **GitHub**: 소스 코드 관리

## 🚀 시작하기

### 필수 요구사항

- Node.js 16.x 이상
- npm 또는 yarn

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/0mininseoul/ascentum-member-hacking.git

# 프로젝트 디렉토리로 이동
cd ascentum-member-hacking

# 의존성 설치
npm install
```

### 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가하세요:

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `build` 폴더에 생성됩니다.

## 📁 프로젝트 구조

```
ascentum-member-hacking/
├── public/              # 정적 파일
├── src/
│   ├── components/      # React 컴포넌트
│   │   ├── ChatBot.tsx  # AI 챗봇 컴포넌트
│   │   └── MemberCard.tsx # 팀원 카드 컴포넌트
│   ├── data/
│   │   └── teamMembers.ts # 팀원 데이터
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── App.css          # 앱 스타일
│   ├── index.tsx        # 엔트리 포인트
│   └── index.css        # 글로벌 스타일 & Tailwind
├── package.json
└── tsconfig.json
```

## 🎯 주요 기능 상세

### 1. 팀원 카드
- 각 팀원의 MBTI, Symoffice 유형 표시
- 주요 강점 2가지 하이라이트
- 호버 시 3D 효과와 애니메이션
- AI 대화 버튼으로 즉시 챗봇 실행

### 2. AI 챗봇
- OpenAI GPT-4 기반 실시간 대화
- 각 팀원의 성격을 반영한 맞춤형 응답
- 깔끔한 채팅 UI와 타이핑 인디케이터
- 대화 히스토리 유지

### 3. 역할 추천 시스템
- 각 팀원의 성격 유형에 최적화된 역할 제안
- 강점 기반 포지셔닝
- 시각적으로 구분된 카드 레이아웃

### 4. 팀워크 향상 팁
- MBTI 유형별 시너지 분석
- 내향형-외향형 밸런스 가이드
- 효과적인 협업 전략 제시

## 🌐 배포

### Production
**URL**: https://ascentum-member-hacking.vercel.app

### GitHub Repository
**URL**: https://github.com/0mininseoul/ascentum-member-hacking

### 자동 배포
- `main` 브랜치에 푸시하면 Vercel이 자동으로 배포
- PR 생성 시 프리뷰 배포 자동 생성

## 🤝 기여

이 프로젝트는 어센텀 팀의 내부 프로젝트입니다.

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.

## 👨‍💻 개발자

**어센텀 팀** - 박영민, 이승호, 이시원, 이승훈

---

Made with 💚 by Ascentum Team
