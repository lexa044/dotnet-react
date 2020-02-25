import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SigninForm from './SigninForm';

import AuthLayout from '../layouts/AuthLayout';

const Signin = () => {
  return (
    <AuthLayout
      leftSideContent={
        <Fragment>
          <p>
            Don't have an account?
            <br />
            <Link to="/authentication/signup">
              Get started!
            </Link>
          </p>
          <p className="mb-0 mt-4 mt-md-5">
            Read our{' '}
            <Link to="#!">
              terms
            </Link>{' '}
            and{' '}
            <Link to="#!">
              conditions{' '}
            </Link>
          </p>
        </Fragment>
      }
    >
      <h3>Sign in</h3>
      <SigninForm hasLabel />
    </AuthLayout>
  );
};

export default Signin;
