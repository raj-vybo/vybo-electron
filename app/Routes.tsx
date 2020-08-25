/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Vybo from './components/wytboard/Vybo';
import Feedback from './components/account/feedback/Feedback';
import ProtectedRoute from './components/account/helpers/ProtectedRoute';
import Signup from './components/account/sign-up/SignUp';
import Forgotpassword from './components/account/forgot-password/ForgotPassword';
import SetPassword from './components/account/set-password/SetPassword';
import Login from './components/account/login/Login';
import App from './containers/App';

import routes from './constants/routes.json';
import { AuthProvider } from './components/account/helpers/userAuth';

export default function Routes() {
  return (
    <App>
      <AuthProvider>
        <Router>
          <Switch>
            <ProtectedRoute path={routes.HOME} exact component={Vybo} />
            <Route path={routes.LOGIN} component={Login} />
            <Route path={routes.SIGNUP} component={Signup} />
            <Route path={routes.FORGOT_PASSWORD} component={Forgotpassword} />
            <Route path={routes.SET_PASSWORD} component={SetPassword} />
            <ProtectedRoute path={routes.FEEDBACK} component={Feedback} />
          </Switch>
        </Router>
      </AuthProvider>
    </App>
  );
}
