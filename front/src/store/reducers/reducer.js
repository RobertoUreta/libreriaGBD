import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  id: null,
  correo: null,
  nombre:null ,
  ap_paterno: null, 
  ap_materno: null,
  direccion: null,
  ciudad: null,
  token: null,
  tipo: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  let newstate = updateObject(state, {
    id: action.authData.id,
    correo: action.authData.correo,
    nombre: action.authData.nombre,
    ap_paterno: action.authData.ap_paterno,
    ap_materno: action.authData.ap_materno,
    direccion: action.authData.direccion,
    ciudad: action.authData.ciudad,
    token: action.authData.token,
    tipo: action.authData.tipo,
    error: null,
    loading: false,
  });
  return newstate;
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}

const authLogout = (state, action) => {
  return initialState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default: return state;

  }
};

export default reducer;
