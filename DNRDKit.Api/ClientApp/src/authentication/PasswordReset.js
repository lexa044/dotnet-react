import React from 'react';
import PasswordResetForm from './PasswordResetForm';
import AuthLayout from '../layouts/AuthLayout';
import { Link } from 'react-router-dom';

const PasswordReset = () => (
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
    <h3>Reset password</h3>
    <PasswordResetForm hasLabel />
  </AuthLayout>
);

export default PasswordReset;
