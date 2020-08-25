import React, { FormEvent, useReducer } from 'react';
import EmailAddressSvg from 'resources/svgs/authentication/EmailAddressSvg.svg';
import { useHistory, Link } from 'react-router-dom';
import { machineIdSync } from 'node-machine-id';
import { Form } from 'react-bootstrap';
import VyboAccountButton from '../shared/VyboSubmitButton/VyboAccountButton';
import VyboAccountErrorMsg from '../shared/VyboAccountError/VyboAccountError';
import VyboAccountTemplate from '../shared/VyboAccountTemplate/VyboAccountTemplate';
import VyboInputBox from '../shared/VyboInputBox/VyboInputBox';
import VyboInputPassword from '../shared/VyboInputPassword/VyboInputPassword';

import { loginApi } from '../helpers/accountApis';
import { loginReducer, initialLoginState } from './login.logic';
import { useAuth } from '../helpers/userAuth';
import { LoginResponse, FormChangePropTypes } from './login.types';
import emailValidator from '../validators/email.validator';
import { passwordValidator } from '../validators/password.validator';

import {
  FORGOT_PASSOWRD_BUTTON_STYLES,
  SIGN_UP_LINE_STYLES,
} from './login.styles';

const Login = () => {
  const history = useHistory();

  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const { setUser } = useAuth();

  const onFormChange = (change: FormChangePropTypes) =>
    dispatch({ type: 'LOGIN_FORM_CHANGE', change });

  const onLoginFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const emailValidation = emailValidator(state.email);
    const passwordValidation = passwordValidator(state.password);
    if (!emailValidation.valid || !passwordValidation.valid) {
      dispatch({
        type: 'FORM_VALIDATION_CHANGE',
        change: {
          emailError: emailValidation.errorMsg,
          passwordError: passwordValidation.errorMsg,
        },
      });
      return;
    }

    loginApi({
      email: state.email,
      password: state.password,
      machineId: machineIdSync(true),
    }).then((res: LoginResponse) => {
      if (res.success) {
        setUser({
          name: res.data.name,
          email: res.data.email,
          token: res.data.jwt,
          loginDone: res.data.loginDone || false,
        });
        history.push('/');
      } else {
        // TODO Before Demo
        dispatch({ type: 'LOGIN_ERROR', errorMsg: res.error.message });
      }
    });
  };

  return (
    <VyboAccountTemplate>
      {{
        mainContent: (
          <>
            <Form
              onSubmit={onLoginFormSubmit}
              className="w-100 d-flex align-items-center justify-content-center flex-column"
            >
              <VyboInputBox
                iconAlt="email"
                placeholder="Email address "
                iconSource={EmailAddressSvg}
                type="text"
                error={state.emailError || undefined}
                value={state.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
              />
              <VyboInputPassword
                placeholder="Password"
                error={state.passwordError || undefined}
                value={state.password}
                onChange={(e) => onFormChange({ password: e.target.value })}
              />
              <p style={FORGOT_PASSOWRD_BUTTON_STYLES} className="mb-0 mr-2">
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: 'none',
                    color: '#9FA5AE',
                  }}
                >
                  Forgot password ?
                </Link>
              </p>
              {state.error && (
                <VyboAccountErrorMsg>{state.error}</VyboAccountErrorMsg>
              )}
              <VyboAccountButton
                hasError={!!state.error}
                disabled={state.submitting}
                type="submit"
              >
                Log In
              </VyboAccountButton>
            </Form>
            <p style={SIGN_UP_LINE_STYLES}>
              Dont have and account? &nbsp;
              <Link
                to="/signup"
                style={{
                  textDecoration: 'underline',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  textDecorationThickness: '1em',
                  color: '#0093FF',
                }}
              >
                Sign Up
              </Link>
            </p>
          </>
        ),
      }}
    </VyboAccountTemplate>
  );
};

export default Login;
