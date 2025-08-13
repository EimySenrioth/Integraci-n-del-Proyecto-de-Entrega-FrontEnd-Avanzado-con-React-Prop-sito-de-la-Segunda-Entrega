// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
//messages → lista con todos los mensajes del chat.
//currentMessage → lo que el usuario está escribiendo en el input/textarea.
//isLoading → true cuando la app está esperando una respuesta de la IA.
//error → guarda el texto de un error (si hay alguno).
const initialState = {
  messages: [],
  currentMessage: '',
  isLoading: false,
  error: null,
};

// Tipos de acciones
const ACTIONS = {
  SET_CURRENT_MESSAGE: 'SET_CURRENT_MESSAGE',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
};

// Reducer
//state → el estado actual.
//action → indica qué quieres hacer y con qué datos (payload).
//switch → ejecuta la modificación según action.type.

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_MESSAGE:
      return {
        ...state,
        currentMessage: action.payload,
      };
    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ACTIONS.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};

// Crear contexto, esto crea un Contexto que servirá para compartir el estado a cualquier componente
const AppContext = createContext();

// Provider del contexto
//useReducer en lugar de useState para manejar un estado más complejo.
//dispatch() envía acciones al reducer.

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Funciones de ayuda
  //addMessage → crea un objeto mensaje con id, text, isUser, timestamp.
//setLoading → cambia isLoading.
//setError / clearError → manejar errores.
//clearMessages → borra todo el historial.
  const setCurrentMessage = (message) => {
    dispatch({ type: ACTIONS.SET_CURRENT_MESSAGE, payload: message });
  };

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      text: message.text,
      isUser: message.isUser,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: ACTIONS.ADD_MESSAGE, payload: newMessage });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  const clearMessages = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGES });
  };

  const value = {
    ...state,
    setCurrentMessage,
    addMessage,
    setLoading,
    setError,
    clearError,
    clearMessages,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
//Esto es lo que se envía al Provider para que cualquier componente pueda leer el estado o usar estas funciones

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export { ACTIONS };