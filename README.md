# AI Girlfriend

An uncensored AI girlfriend web application with voice capabilities and persistent chat history.

## Features
- **Uncensored Chat**: Powered by Hugging Face Inference API
- **Voice Output**: Text-to-Speech using `edge-tts`
- **Authentication**: Secure login with Clerk
- **Chat History**: Persistent chat sessions with Neon DB (PostgreSQL)
- **Multi-Session**: Create and manage multiple conversations
- **User Isolation**: Each user has their own private chat history
- **Modern UI**: Built with React, Vite, and Tailwind CSS

## Tech Stack

**Backend:**
- FastAPI
- SQLAlchemy + PostgreSQL (Neon DB)
- Hugging Face Inference API
- edge-tts

**Frontend:**
- React + Vite
- Tailwind CSS
- Clerk Authentication
- Axios

## Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- `uv` package manager
- Supabase account (for database)
- Clerk account (for authentication)
- Hugging Face account (for AI model)

### Installation

1.  **Install dependencies**:
    ```bash
    uv sync
    cd frontend && npm install
    ```

2.  **Backend Environment Variables** (`backend/.env`):
    ```bash
    HF_TOKEN=your_huggingface_token
    DATABASE_URL=your_supabase_connection_string
    ```

3.  **Frontend Environment Variables** (`frontend/.env`):
    ```bash
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
    ```

4.  **Run Locally**:
    ```bash
    ./start.sh
    ```

## Deployment (Hugging Face Spaces)

1.  Create a new Space (Docker SDK)
2.  Set environment variables as Secrets:
    - `HF_TOKEN`
    - `DATABASE_URL` (URL-encode special characters in password)
    - `VITE_CLERK_PUBLISHABLE_KEY`
3.  Push code to Space
4.  The `Dockerfile` handles the build automatically

See [deployment guide](./deployment_guide.md) for detailed instructions.

## Database Schema

**sessions**
- User-specific chat sessions
- Supports multiple conversations per user

**messages**  
- Message history per session
- Stores user and AI responses

## License
MIT

