import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Label from 'reactstrap/es/Label';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import withRedirect from '../hoc/withRedirect';

const PasswordResetForm = ({ setRedirect, setRedirectUrl, hasLabel }) => {
  // State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    toast.success('Login with your new password');
    setRedirect(true);
  };

  useEffect(() => {
    setRedirectUrl(`/authentication/signin`);
  }, [setRedirectUrl]);

  useEffect(() => {
    if (password === '' || confirmPassword === '') return setIsDisabled(true);

    setIsDisabled(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Form className={classNames('mt-3', { 'text-left': hasLabel })} onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>New Password</Label>}
        <Input
          placeholder={!hasLabel ? 'New Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          autoComplete="new-password"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Confirm Password</Label>}
        <Input
          placeholder={!hasLabel ? 'Confirm Password' : ''}
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          type="password"
          autoComplete="new-password"
        />
      </FormGroup>
      <Button color="primary" block className="mt-3" disabled={isDisabled}>
        Set password
      </Button>
    </Form>
  );
};

PasswordResetForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  setRedirectUrl: PropTypes.func.isRequired,
  hasLabel: PropTypes.bool
};

PasswordResetForm.defaultProps = { hasLabel: false };

export default withRedirect(PasswordResetForm);
