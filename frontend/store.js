import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  auth: {
    isAuth: false
  }
};

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return Object.assign({}, state, {
        auth: {
          isAuth: true,
          ...action.auth
        }
      });
    case actionTypes.LOGOUT:
      return Object.assign({}, state, {
        auth: null
      });
    default:
      return state;
  }
};

export const login = auth => dispatch => {
  return dispatch({ type: actionTypes.LOGIN, auth });
};

export const logout = () => dispatch => {
  return dispatch({ type: actionTypes.LOGOUT });
};
export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
