# AI Companion - Frontend

![AI Companion Banner](https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2000&auto=format&fit=crop)

A premium, next-generation AI companionship platform featuring realistic voice interaction, uncensored conversations, and smart memory. Built with React, Vite, and Tailwind CSS.

## ✨ Features

-   **🎙️ Natural Voice Interaction**: High-quality neural TTS with play, pause, and seek controls.
-   **🔓 Uncensored & Open**: Designed for open, honest, and intimate conversations without arbitrary filters.
-   **🧠 Smart Memory**: Automatically summarizes conversations and remembers context across sessions.
-   **🎨 Premium UI**: Glassmorphism design, smooth animations, and a responsive layout.
-   **🔐 Secure Authentication**: Integrated with Clerk for secure user management.

## 🛠️ Tech Stack

-   **Framework**: React 18 + Vite
-   **Styling**: Tailwind CSS v4 + Lucide React Icons
-   **Fonts**: Outfit (Google Fonts)
-   **State Management**: React Hooks
-   **Authentication**: Clerk

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jeevanproart/ai-companion-frontend.git
    cd ai-companion-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add your Clerk and API keys:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
    VITE_API_URL=http://localhost:8000
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 📱 Project Structure

```
src/
├── components/
│   ├── AudioPlayer.jsx    # Custom audio player with seek bar
│   ├── ChatBox.jsx        # Main chat interface
│   ├── LandingPage.jsx    # Premium landing page with animations
│   ├── Sidebar.jsx        # Chat history and session management
│   └── VoiceSelector.jsx  # Voice selection dropdown
├── App.jsx                # Main application logic and routing
└── index.css              # Global styles and Tailwind configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
