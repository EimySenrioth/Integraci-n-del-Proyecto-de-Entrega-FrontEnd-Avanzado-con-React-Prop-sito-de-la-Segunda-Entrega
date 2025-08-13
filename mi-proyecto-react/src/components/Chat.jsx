// src/components/Chat.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import useOllama from '../hooks/useOllama';
import './Chat.css';

//React y useState: para crear componentes y manejar estado local.
//useApp: es un hook personalizado para acceder al contexto global de la app, 
// funciones y estados para manejar mensajes, errores y carga.
//useOllama: hook personalizado que abstrae la lógica para enviar mensajes y recibir respuestas de la IA.
//./Chat.css: estilos para el componente.

const Chat = () => {
  const { currentMessage, setCurrentMessage, addMessage, setLoading, setError, clearError } = useApp();
  const { sendMessage, isLoading, error } = useOllama();
  const [localMessage, setLocalMessage] = useState('');
  //// Estado local para el mensaje que el usuario escribe antes de enviarlo,  '' para indicar que al principio no hay ningún texto

  const handleSubmit = async (e) => {
    e.preventDefault();
    //// evita que el formulario recargue la página
    if (!localMessage.trim()) return;
// no enviar mensajes vacíos
// trim() elimina espacios al inicio y final del mensaje
    clearError();
    
    // Agregar mensaje del usuario al historial
    addMessage({
      text: localMessage,
      isUser: true,
    });

    const userMessage = localMessage;
    setLocalMessage('');// limpiar el textarea
    setLoading(true);

    try {
      // Enviar mensaje a Ollama
      const response = await sendMessage(userMessage);
      
//isUser: true → para mensajes escritos por el usuario.
//isUser: false → para mensajes escritos o generados por la IA.

      // Agregar respuesta de la IA
      addMessage({
        text: response,
        isUser: false,
      });
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat con DeepSeek R1</h2>
        <div className="connection-status">
          <span className={`status-indicator ${isLoading ? 'loading' : 'ready'}`}></span>
          <span>{isLoading ? 'Pensando...' : 'Listo'}</span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={clearError} className="close-error">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-container">
          <textarea
            value={localMessage}
            onChange={(e) => setLocalMessage(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            className="message-input"
            rows={3}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className="send-button"
            disabled={isLoading || !localMessage.trim()}
          >
            {isLoading ? '⏳' : '📤'} {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>

      <div className="chat-tips">
        <h4>💡 Consejos:</h4>
        <ul>
          <li>Presiona <strong>Enter</strong> para enviar, <strong>Shift+Enter</strong> para nueva línea</li>
          <li>DeepSeek R1 es excelente para programación, análisis y resolución de problemas</li>
          <li>Sé específico en tus preguntas para obtener mejores respuestas</li>
        </ul>
      </div>
    </div>
  );
};

export default Chat;