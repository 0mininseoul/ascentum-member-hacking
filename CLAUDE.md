# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ascentum Member Hacking** is an interactive team personality analysis website that showcases 4 team members with AI chatbot integration. Users can explore each team member's MBTI and Symoffice personality types, and engage in AI-powered conversations that simulate each member's unique personality.

**Tech Stack:**
- React 19.2.0 with TypeScript 4.9.5
- Tailwind CSS 4.1.14 for styling with custom Castleton Green brand color (#1C543E)
- OpenAI GPT-4o-mini API for AI chatbot conversations
- Supabase for optional database (chat history logging)
- Create React App (react-scripts 5.0.1) for build tooling

**Production URL:** https://ascentum-member-hacking.vercel.app

## Common Commands

### Development
```bash
npm start                 # Start development server on http://localhost:3000
npm run build            # Create production build in build/
npm test                 # Run tests in watch mode
```

### Deployment
- Main branch automatically deploys to Vercel
- Push to `main` branch to trigger production deployment
- PR creation automatically generates preview deployment

## Architecture

### Component Structure

**Main App ([src/App.tsx](src/App.tsx))**
- Root component with scroll-based animations using IntersectionObserver
- Manages `selectedMember` state to control ChatBot modal visibility
- Contains three main sections: Team Overview, Team Collaboration Roles, and Teamwork Tips
- Handles member profile image loading with fallback to first character

**MemberCard ([src/components/MemberCard.tsx](src/components/MemberCard.tsx))**
- Displays individual team member profile with MBTI badge (top-right), Instagram badge (top-left), avatar, strengths
- Avatar positioned as sibling of header (not child) to prevent overflow-hidden issues
- Profile images loaded from `/images/${member.id}.jpg` with fallback rendering
- Implements staggered animation delays based on card index
- Triggers chatbot modal via `onChatClick` prop

**ChatBot ([src/components/ChatBot.tsx](src/components/ChatBot.tsx))**
- Modal component for AI conversations with team members
- **Critical Architecture:** Makes direct OpenAI API calls to gpt-4o-mini from frontend (not backend)
- Creates chat session in Supabase on mount (optional), stores all messages to database if session exists
- Constructs conversation with: system prompt + message history + new user message
- Auto-scrolls to bottom on new messages using messagesEndRef
- API Configuration: gpt-4o-mini model, temperature 0.8, max_tokens 500

### Data Layer

**Team Members Data ([src/data/teamMembers.ts](src/data/teamMembers.ts))**
- Central source of truth for all team member information
- Each member has: id, name, MBTI, instagram, Symoffice types, personality traits, and **systemPrompt**
- `systemPrompt` defines AI personality for ChatBot conversations - this is crucial for maintaining character consistency
- Instagram usernames (without @): 박영민 (0_min._.00), 이승호 (hvn_studio), 이시원 (le.siwon), 이승훈 (gvn_or)
- 4 team members: 박영민 (INTP), 이승호 (INTJ), 이시원 (ESTJ), 이승훈 (ESTJ)

**Supabase Integration ([src/lib/supabase.ts](src/lib/supabase.ts))**
- Exports configured Supabase client for optional chat history logging
- Database tables: `ai_chat_sessions` (tracks conversations), `ai_chat_messages` (stores individual messages)
- Database operations are optional - app works without Supabase connection

### Styling

**Tailwind Configuration ([tailwind.config.js](tailwind.config.js))**
- Custom color: `castleton-green` (#1C543E) - primary brand color used throughout
- Custom animations: fadeInUp, fadeInDown, scaleIn, slideInLeft, slideInRight, float, gradientShift
- Custom font: Inter (extended to sans family)

**CSS Architecture:**
- Global styles and Tailwind imports in [src/index.css](src/index.css)
- Component-specific CSS in [src/App.css](src/App.css)
- Inline Tailwind classes for component styling
- Heavy use of gradient backgrounds (`bg-gradient-to-br`) for visual depth

## Important Conventions

### Environment Variables
- **Required:** OpenAI API key must be stored in `.env` as `REACT_APP_OPENAI_API_KEY`
- **Security Note:** API key is exposed in frontend - for production, consider backend proxy
- Supabase URL and anon key are hardcoded in [src/lib/supabase.ts](src/lib/supabase.ts) (optional)

### Image Handling
- Team member images stored in `/public/images/${member.id}.jpg`
- All images have onError handlers that fallback to displaying first character(s) of name
- Image IDs match member.id from teamMembers data (e.g., 'park-young-min.jpg')

### AI Personality System
- Each team member's personality is defined in their `systemPrompt` field
- System prompts emphasize that the AI is talking TO an external visitor ABOUT themselves (not talking to the team member)
- Prompts include background, exaggerated personality traits, and specific conversation style guidelines
- When modifying AI behavior, edit the systemPrompt in teamMembers.ts, NOT the ChatBot component

### Animation System
- Scroll-based animations use IntersectionObserver with `.scroll-reveal` class
- Component animations use staggered delays via `style={{ animationDelay }}`
- All custom animations defined in Tailwind config keyframes

## Deployment Notes

- Deployed on Vercel with automatic CI/CD from main branch
- Build command: `npm run build`
- **Required:** Set `REACT_APP_OPENAI_API_KEY` environment variable in Vercel
- Supabase is optional for chat history logging
- **Security Warning:** OpenAI API key is exposed in frontend bundle - consider implementing backend proxy for production
