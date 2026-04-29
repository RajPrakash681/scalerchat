# ScalerChat — Persona-Based AI Chatbot

Have real conversations with **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra** from Scaler Academy — powered by GPT-4o-mini and carefully researched system prompts.

**Live App:** _[Add your Vercel URL here after deployment]_  
**Backend API:** _[Add your Railway URL here after deployment]_

---

## Features

- **3 distinct AI personas** — each with a unique voice, background, and communication style
- **Persona switcher** — switching tabs resets the conversation and loads the persona's system prompt
- **4 suggestion chips per persona** — tailored quick-start questions for each person
- **Typing indicator** — animated dots while the API call is in progress
- **Multi-turn conversation** — chat history is passed with each request for context
- **Error handling** — graceful fallback messages if the API is unavailable
- **Dark theme UI** — glassmorphism design with per-persona accent colors
- **Mobile responsive** — works on any screen size

---

## Tech Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 19, custom CSS animations   |
| Backend  | Node.js, Express 5                |
| LLM API  | OpenAI GPT-4o-mini                |
| Frontend Deploy | Vercel                     |
| Backend Deploy  | Railway                    |

---

## Local Setup

### Prerequisites
- Node.js 18+
- An OpenAI API key (get one at [platform.openai.com](https://platform.openai.com/api-keys))

### 1. Clone and install

```bash
git clone <your-repo-url>
cd chat-persona
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm install
npm start
```

The backend runs on `http://localhost:5000`.

### 3. Set up the frontend

```bash
cd frontend
cp .env.example .env
# .env already points to http://localhost:5000 — no changes needed for local dev
npm install
npm start
```

The app opens at `http://localhost:3000`.

---

## Deployment

### Backend → Railway

```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway up
```

Set the `OPENAI_API_KEY` environment variable in the Railway dashboard under your project's Variables tab.

### Frontend → Vercel

```bash
npm install -g vercel
vercel login
cd frontend
```

Before deploying, set `REACT_APP_API_URL` to your Railway backend URL:

```bash
vercel env add REACT_APP_API_URL
# Enter: https://your-backend.up.railway.app
vercel --prod
```

After deploying, update the live links at the top of this README.

---

## Project Structure

```
chat-persona/
├── backend/
│   ├── server.js          # Express API + system prompts + OpenAI integration
│   ├── .env.example       # Environment variable template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component (full UI + chat logic)
│   │   └── index.css      # Global styles + animations
│   ├── public/
│   │   └── index.html     # HTML template with Google Fonts
│   └── package.json
├── prompts.md             # All system prompts with design annotations
├── reflection.md          # 400-word assignment reflection
└── README.md
```

---

## Prompt Engineering Techniques Used

Each system prompt applies:

1. **Persona description** — verified background, values, and communication style
2. **Few-shot examples** — 3 Q&A pairs embedded directly in each system prompt
3. **Chain-of-Thought instruction** — persona-specific internal reasoning framing
4. **Output format** — 4-5 sentences, flowing prose, ends with a question
5. **Constraints** — explicit prohibitions that prevent generic AI behavior

See [prompts.md](./prompts.md) for the full prompts with inline design annotations.

---

## Environment Variables

**Backend** (`backend/.env`):
```
OPENAI_API_KEY=sk-...
PORT=5000
```

**Frontend** (`frontend/.env`):
```
REACT_APP_API_URL=http://localhost:5000
```

No API keys are committed to this repository. The `.gitignore` excludes all `.env` files.
