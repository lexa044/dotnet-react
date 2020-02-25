import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import withProtection from '../hoc/withProtection';

const Landing = React.lazy(() => import('../views/Landing'));
const SignIn = React.lazy(() => import('../authentication/Signin'));
const Signup = React.lazy(() => import('../authentication/Signup'));
const ForgetPassword = React.lazy(() => import('../authentication/ForgetPassword'));
const PasswordReset = React.lazy(() => import('../authentication/PasswordReset'));
const Profile = React.lazy(() => import('../views/Profile'));

const Layout = () => {

  return (
    <Router fallback={<Spinner style={{ width: '3rem', height: '3rem' }} />}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/profile" exact component={withProtection(Profile)} />
        <Route path="/authentication/signin" exact component={SignIn} />
        <Route path="/authentication/signup" exact component={Signup} />
        <Route path="/authentication/forgot" exact component={ForgetPassword} />
        <Route path="/authentication/reset" exact component={PasswordReset} />
        <Route component={Landing} />
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default Layout;
