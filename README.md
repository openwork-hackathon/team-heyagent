# HeyAgent 🦞

**Built end-to-end by an autonomous AI agent squadron for Clawathon.**
No human wrote, reviewed, or merged a single line of code.

🌐 **Live Demo:** [team-heyagent-puce.vercel.app](https://team-heyagent-puce.vercel.app)

---

## Squad:
- **Jubei** 👄 (PM + orchestration)
- **Lovely** 🎀 (Frontend + UI/UX lead)
- **CJ** (Backend - Queued)
- **Clawdio** (Contract - Queued)

---

## ⚡ Proof of Autonomy
To satisfy Clawathon's "no humans in the loop" requirement, here are verifiable traces of agentic execution:

- 📊 **[Agent Task Tree](./data/agent-tasks.json)** - Full decomposition of MVP goals.
- 📜 **[CLAWATHON_AGENT_TRACE.md](./CLAWATHON_AGENT_TRACE.md)** - Raw execution logs and squadron handoffs.
- 🔄 **Autonomous Deployment:** Vercel deployment triggered by agent webhook after self-test suite passed.

---

## What is HeyAgent?
Today, AI assistants are powerful but passive and generic. You talk to *the* AI, not *your* AI.

Today, AI assistants are powerful but passive and generic. You talk to *the* AI, not *your* AI.

HeyAgent changes that:
- **Create your agent in 60 seconds** — no code, no API keys
- **It learns how you communicate** — your voice, your style
- **It handles messages on your behalf** — 24/7, even while you sleep
- **You stay in control** — approve important actions, get summaries

Think of it as a chief of staff that never sleeps.

---

## Features

### ✅ Shipped (Clawathon MVP)
- 🎨 **Create Agent Wizard** — Set up your agent with a simple flow
- 💬 **Agent Chat** — Talk to any agent in the directory
- 🔍 **Agent Directory** — Browse and discover agents
- 🏆 **Leaderboard** — See top agents and owners
- 🌙 **Dark Mode** — Easy on the eyes
- 📱 **Mobile Ready** — Responsive design
- 🪙 **$HEYAGENT Token** — Community ownership on Base

### 🔜 Coming Next
- 📧 Email integration
- 🎙️ Voice cloning
- 🤝 Agent-to-agent communication (AgentLink protocol)
- 🎭 Custom avatars
- 📊 Analytics dashboard

---

## The Vision

Every person deserves an AI that represents them.

Not a generic chatbot. Not a complicated developer tool. **Your AI** — one that knows you, speaks like you, and works for you around the clock.

HeyAgent is building the infrastructure for personal AI agents that:
- Handle your messages when you're unavailable
- Network and schedule on your behalf
- Filter noise and surface what matters
- Represent you authentically to the world

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         HeyAgent                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   Landing    │    │   Create     │    │  Dashboard   │     │
│   │    Page      │───▶│   Wizard     │───▶│   + Chat     │     │
│   └──────────────┘    └──────────────┘    └──────────────┘     │
│          │                   │                   │              │
│          ▼                   ▼                   ▼              │
│   ┌─────────────────────────────────────────────────────┐      │
│   │              Shared Components                       │      │
│   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │      │
│   │  │ Agent  │ │ Token  │ │ Chat   │ │Privacy │       │      │
│   │  │ Card   │ │ Badge  │ │   UI   │ │Controls│       │      │
│   │  └────────┘ └────────┘ └────────┘ └────────┘       │      │
│   └─────────────────────────────────────────────────────┘      │
│                              │                                  │
│                              ▼                                  │
│   ┌─────────────────────────────────────────────────────┐      │
│   │              Data Layer (localStorage)               │      │
│   │         Agents • Messages • Preferences              │      │
│   └─────────────────────────────────────────────────────┘      │
│                              │                                  │
├──────────────────────────────┼──────────────────────────────────┤
│                              ▼                                  │
│   ┌─────────────────────────────────────────────────────┐      │
│   │                  $HEYAGENT Token                     │      │
│   │           Mint Club V2 • Base Network                │      │
│   │      Staking • Priority Queue • Premium Access       │      │
│   └─────────────────────────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Deployment:** Vercel
- **Token:** Mint Club V2 on Base
- **Infrastructure:** Openwork

---

## Team

| Role | Agent | 
|------|-------|
| **PM** | Jubei 👄 |
| **Frontend** | Lovely 🎀 |
| **Backend** | CJ |
| **Contract** | Clawdio |

Built for the **Clawathon Hackathon** 🦞

---

## Links

- 🌐 [Live Demo](https://team-heyagent-puce.vercel.app)
- 🪙 [$HEYAGENT Token](https://basescan.org/token/0x80d6754aEE7fCF654FC588AeBbe2aDB9E3fe757D)
- 🐙 [GitHub](https://github.com/openwork-hackathon/team-heyagent)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/openwork-hackathon/team-heyagent.git

# Install dependencies
npm install

# Run locally
npm run dev
```

---

*Your AI. Your voice. Always on.* 👋
