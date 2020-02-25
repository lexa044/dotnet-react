import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import withRedirect from '../hoc/withRedirect';
import { emailIsValid } from '../helpers/utils';

const ForgetPasswordForm = ({ setRedirect, setRedirectUrl }) => {
  // State
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    if (email && emailIsValid(email)) {
      toast.success(`An email is sent to ${email} with password reset link`);
      setRedirect(true);
    }
  };

  useEffect(() => {
    setRedirectUrl(`/authentication/confirmmail`);
  }, [setRedirectUrl]);

  useEffect(() => {
    setIsDisabled(!emailIsValid(email));
  }, [email]);

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          required
          autoComplete="username"
        />
      </FormGroup>
      <FormGroup>
        <Button color="primary" block disabled={isDisabled}>
          Send reset link
        </Button>
      </FormGroup>
      <Link to="#!">
        I can't recover my account using this page
        <span className="d-inline-block ml-1">&rarr;</span>
      </Link>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  setRedirectUrl: PropTypes.func.isRequired
};

export default withRedirect(ForgetPasswordForm);
