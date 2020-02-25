import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import { AppContext } from '../contexts/Context';
import withRedirect from '../hoc/withRedirect';
import { loginUser } from '../actions/auth';
import { emailIsValid } from '../helpers/utils';

const SigninForm = ({ setRedirect, hasLabel }) => {
  const { identity, identityDispatch } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(identityDispatch, email, password);
  };

  useEffect(() => {
    setIsDisabled(!emailIsValid(email) || !password|| identity.isLoggingIn);
  }, [email, password, identity.isLoggingIn]);

  useEffect(() => {
    if(identity.isAuthenticated) {
        setRedirect(true);
    }
  }, [setRedirect, identity.isAuthenticated]);  

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Email address</Label>}
        <Input
          placeholder={!hasLabel ? 'Email address' : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          required
          autoComplete="username"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Password</Label>}
        <Input
          placeholder={!hasLabel ? 'Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          autoComplete="new-password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label="Remember me"
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/authentication/forgot`}>
            Forget Password?
          </Link>
        </Col>
      </Row>
        {identity.loginError && (
            <div className="alert alert-warning" role="alert">
                Incorrect email or password.
        </div>
        )}
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          Log in {identity.isLoggingIn && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
        </Button>
      </FormGroup>
    </Form>
  );
};

SigninForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  hasLabel: PropTypes.bool
};

SigninForm.defaultProps = {
  hasLabel: false
};

export default withRedirect(SigninForm);
