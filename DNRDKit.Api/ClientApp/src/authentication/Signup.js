import React from 'react';
import { Link } from 'react-router-dom';
import SignunForm from './SignupForm';
import AuthLayout from '../layouts/AuthLayout';

const Signup = () => {
  return (
    <AuthLayout
    leftSideContent={
      <p className="pt-3">
        Have an account?
        <br />
        <Link to="/authentication/signin">
          Sign In
        </Link>
      </p>
    }
  >
      <h3>Sign up</h3>
      <SignunForm hasLabel />
    </AuthLayout>
  );
};

export default Signup;
