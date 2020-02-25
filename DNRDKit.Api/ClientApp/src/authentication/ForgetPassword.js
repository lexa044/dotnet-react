import React from 'react';
import ForgetPasswordForm from './ForgetPasswordForm';
import AuthLayout from '../layouts/AuthLayout';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <AuthLayout
      leftSideContent={
        <p className="mb-0 mt-4 mt-md-5">
          Read our&nbsp;
          <Link to="#!">
            terms
          </Link>&nbsp;
          and&nbsp;
          <Link to="#!">
            conditions&nbsp;
          </Link>
        </p>
      }
    >
      <h4 className="mb-0"> Forgot your password?</h4>
      <p className="mb-0">Enter your email and we'll send you a reset link.</p>
      <ForgetPasswordForm />
    </AuthLayout>
  );
};

export default ForgetPassword;
