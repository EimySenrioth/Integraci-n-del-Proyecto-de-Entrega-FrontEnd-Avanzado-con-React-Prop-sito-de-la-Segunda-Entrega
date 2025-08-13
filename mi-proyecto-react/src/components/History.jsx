// src/components/History.jsx
import { useApp } from '../context/AppContext';
import './History.css';

const History = () => {
  const { messages, clearMessages } = useApp();

  if (messages.length === 0) {
    return (
      <div className="history-container">
        <div className="history-header">
          <h3>Historial de Conversaciones</h3>
        </div>
        <div className="history-empty">
          <p>No hay conversaciones aún. ¡Comienza a chatear!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>Historial de Conversaciones</h3>
        <button 
          className="clear-button"
          onClick={clearMessages}
          title="Limpiar historial"
        >
          🗑️ Limpiar
        </button>
      </div>
      
      <div className="history-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-header">
              <span className="message-author">
                {message.isUser ? '👤 Tú' : '🤖 DeepSeek R1'}
              </span>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-text">
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Iterar sobre los mensajes {messages.map((message) => ( en el aaray, y  message es el objeto de un mensaje individual
// key:  React necesita una key única para identificar cada mensaje y optimizar el renderizado
//Si message.isUser es true (mensaje del usuario) → añade user-message.
//Si es false (mensaje de la IA) → añade ai-message.
export default History;