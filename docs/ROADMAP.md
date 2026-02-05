# HeyAgent Roadmap 🗺️

*Last updated: 2026-02-04 by Jubei 👄*

This document captures our full product vision beyond the Clawathon MVP.

---

## ✅ Phase 1: Clawathon MVP (SHIPPED)

### Core Features
- [x] **Create Agent Wizard** — 4-step flow: name, avatar, personality, settings
- [x] **Agent Chat** — Real-time conversation with Gemini backend
- [x] **Agent Directory** — Browse and discover public agents
- [x] **Dashboard** — "My Agents" view with management
- [x] **Leaderboard** — Top agents and owners
- [x] **Dark Mode** — Full theme support
- [x] **Mobile Responsive** — Works on all devices
- [x] **$HEYAGENT Token** — Mint Club bonding curve on Base

### Technical
- [x] Next.js 14 App Router
- [x] Gemini 1.5 Flash backend
- [x] URL summarization tool (agentic capability)
- [x] localStorage persistence
- [x] Vercel deployment with auto-deploy from main

---

## 🚧 Phase 2: Voice & Presence (POST-HACKATHON)

### Voice Cloning
- [ ] **Voice Upload** — User provides 30-60 seconds of audio samples
- [ ] **Voice Synthesis** — Clone voice using ElevenLabs/PlayHT/Resemble.ai
- [ ] **Voice Responses** — Agent speaks in user's cloned voice
- [ ] **Voice Preview** — Test voice before publishing

**Tech stack:** ElevenLabs API (best quality), PlayHT (cost-effective), Resemble.ai (enterprise)

### Static Avatar
- [ ] **Photo Upload** — User uploads their photo
- [ ] **AI Avatar Generation** — Generate stylized avatar from photo
- [ ] **Default Avatars** — Library of pre-made options
- [ ] **AI Generation** — Generate avatar from text prompt (DALL-E/Stable Diffusion)

**Tech stack:** Replicate API, Stable Diffusion XL, or DALL-E 3

---

## 🔮 Phase 3: Talking Avatar (FUTURE)

### Animated Avatar
- [ ] **Lip Sync** — Avatar mouth moves with speech
- [ ] **Expressions** — Basic emotional expressions (happy, thinking, etc.)
- [ ] **Real-time Rendering** — Low-latency avatar animation

**Tech options:**
- **D-ID** — Best for realistic talking heads, async rendering
- **HeyGen** — Similar to D-ID, good API
- **Synthesia** — Enterprise-grade, expensive
- **Nvidia Audio2Face** — Real-time but requires GPU infrastructure
- **SadTalker** — Open source, self-hosted option

**Reality check:** True real-time (<500ms) is hard. Most services render in 2-10 seconds. Options:
1. Pre-render common responses
2. Show static avatar while rendering, then swap
3. Use simpler animation (2D cartoon style) for speed

### Premium Tier
- [ ] **Upgrade Flow** — Payment integration for advanced features
- [ ] **Talking Avatar Access** — Premium-only feature
- [ ] **Priority Voice Cloning** — Faster processing for paid users

---

## 🌐 Phase 4: Agent Network (VISION)

### AgentLink Protocol
- [ ] **Agent-to-Agent Communication** — Agents negotiate/delegate on behalf of users
- [ ] **Dual Channel Protocol** — Natural language (Layer A) + structured JSON (Layer B)
- [ ] **Task Handoff** — Seamlessly transfer tasks between agents
- [ ] **Battle Arena** — Visual UI for agent negotiations

### Integrations
- [ ] **Email** — Agent handles inbox, drafts responses
- [ ] **Calendar** — Scheduling on user's behalf
- [ ] **Messaging** — WhatsApp/Telegram/Discord integration
- [ ] **Social** — Twitter/LinkedIn presence management

### Analytics
- [ ] **Conversation Insights** — What topics come up most
- [ ] **Response Analytics** — How well is the agent performing
- [ ] **User Feedback Loop** — Improve agent from user corrections

---

## 💡 Ideas Parking Lot

*Features we've discussed but not prioritized:*

- **Bring Your Own Agent (BYOA)** — Connect existing OpenClaw agents (imports SOUL.md, MEMORY.md, personality). Also support importing agents from other platforms via adapter pattern. HeyAgent becomes the communication layer for pre-trained agents. "Agent portability" differentiator.
- **Vibe Slider** — "Professional ↔ Chaos Gremlin" personality spectrum
- **Voice Presets** — "Polite British" / "Cyberpunk Glitch" / "Anime Protagonist"
- **Avatar Style Picker** — Pokemon style, Realistic, Cartoon, etc.
- **Ghost Memory** — Visual display of agent's learned facts about user
- **Multi-Agent Dashboard** — Manage fleet of agents for different contexts
- **White Label** — Custom branding for businesses
- **API Access** — Let developers integrate HeyAgent into their apps

---

## 📊 Tech Debt & Infrastructure

- [ ] Move from localStorage to proper database (Supabase/Planetscale)
- [ ] User authentication (Clerk/NextAuth)
- [ ] Rate limiting and abuse prevention
- [ ] Monitoring and error tracking (Sentry)
- [ ] CI/CD pipeline improvements
- [ ] Unit and integration tests

---

*This roadmap is a living document. Priorities may shift based on user feedback and market opportunities.*

*— Jubei 👄 & the HeyAgent Squadron 🦞*
