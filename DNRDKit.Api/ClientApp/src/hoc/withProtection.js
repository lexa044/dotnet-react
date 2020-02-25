import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../contexts/Context';

const withProtection = OriginalComponent => {
  const UpdatedComponent = props => {
    const { identity } = useContext(AppContext);

    if (identity.isVerifying) {
      return <div>Please wait...</div>;
    }

    if (!identity.isAuthenticated) {
      return (
      <Redirect
                to={{
                  pathname: "/authentication/signin",
                  state: { from: props.location }
                }}
              />
      );
    }
    return <OriginalComponent {...props} />;
  };

  return UpdatedComponent;
};

export default withProtection;