import { createContext } from 'react';

export const defaulIdentity = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  user: {}
};

export const AppContext = createContext({
  isFluid: false,
  isDark: false,
  identity: defaulIdentity
});