// src/App.jsx
import React from 'react';
import { AppProvider } from './context/AppContext';
import Chat from './components/Chat';
import History from './components/History';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>🚀 React + Ollama + DeepSeek R1</h1>
            <p>Chatea con inteligencia artificial local usando DeepSeek R1</p>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <div className="app-grid">
              <div className="chat-section">
                <Chat />
              </div>
              
              <div className="history-section">
                <History />
              </div>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>
              Proyecto React con Ollama - DeepSeek R1 | 
              <a href="https://ollama.com" target="_blank" rel="noopener noreferrer">
                Ollama
              </a> | 
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                React
              </a>
            </p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;