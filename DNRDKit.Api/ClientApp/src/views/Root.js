import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AppContext, defaulIdentity } from '../contexts/Context';
import toggleStylesheet from '../helpers/toggleStylesheet';
import { getItemFromStore, setItemToStore } from '../helpers/utils';
import { authReducer } from '../reducers/auth';
import { verifyAuth } from '../actions/auth';
import { configureFakeBackend } from '../helpers/fake-backend';
import { SETTINGS } from '../config/app';

const Root = props => {
  const [isFluid, setIsFluid] = useState(getItemFromStore('isFluid', false));
  const [isDark, setIsDark] = useState(getItemFromStore('isDark', false));
  const [identity, identityDispatch] = useReducer(authReducer, defaulIdentity);

  const value = {
    isFluid,
    setIsFluid,
    isDark,
    setIsDark,
    identity,
    identityDispatch
  };

  const setStylesheetMode = mode => {
    setItemToStore(mode, value[mode]);
    toggleStylesheet({ isDark });
  };

  useEffect(() => {
    setStylesheetMode('isFluid');
    // eslint-disable-next-line
  }, [isFluid]);

  useEffect(() => {
    setStylesheetMode('isDark');
    // eslint-disable-next-line
  }, [isDark]);

  useEffect(() => {
    if(identity.isAuthenticated){
        window.localStorage.setItem(SETTINGS.STORAGE_KEY, identity.user.token);
    }
    else{
      verifyAuth(identityDispatch);
    }
    // eslint-disable-next-line
  }, [identity.isAuthenticated]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

Root.propTypes = { children: PropTypes.node };

// setup fake backend
configureFakeBackend();

export default Root;