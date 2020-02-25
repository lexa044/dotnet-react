import { authService } from "../services/authentication";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = (dispatch, email, password) => {
  dispatch(requestLogin());
  authService
    .signInWithEmailAndPassword(email, password, user => {
      if (user) {
        dispatch(receiveLogin(user));
      } else {
        dispatch(loginError());
      }
    });
};

export const logoutUser = (dispatch) => {
  dispatch(requestLogout());
  authService
    .signOut(user => {
      dispatch(receiveLogout());
    });
};

export const verifyAuth = (dispatch) => {
  dispatch(verifyRequest());
  authService
    .onAuthStateChanged(user => {
      if (user) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};