import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from '../types';

// Cada reducer tiene su state
const initialState = {
  alerta: null
}

export default function alertaReducer(state = initialState, action) {
  // Extraer atributos de action
  const { type, payload } = action;

  // Reducers
  switch(type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        alerta: payload
      }
    
    case OCULTAR_ALERTA:
      return {
        ...state,
        alerta: null
      }
    
    default:
      return state;
  }
}