import React, { FormEvent, useReducer, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import VerificationKeySvg from 'resources/svgs/authentication/VerificationKeySvg.svg';
import { Button } from 'react-bootstrap';
import codeValidator from '../validators/verification-code.validator';
import {
  passwordValidator,
  confirmPassValidator,
} from '../validators/password.validator';
import { setPassReducer, setPassInitialState } from './set-pass.logic';

import { useAuth } from '../helpers/userAuth';
import { setPasswordApi, forgotPasswordApi } from '../helpers/accountApis';
import messages from '../helpers/account.messages';

import VyboAccountTemplate from '../shared/VyboAccountTemplate/VyboAccountTemplate';
import VyboInputBox from '../shared/VyboInputBox/VyboInputBox';
import VyboInputPassword from '../shared/VyboInputPassword/VyboInputPassword';
import VyboAccountErrorMsg from '../shared/VyboAccountError/VyboAccountError';
import VyboAccountSuccessMsg from '../shared/VyboAccountSuccess/VyboAccountSuccess';
import VyboAccountButton from '../shared/VyboSubmitButton/VyboAccountButton';
import { SIGN_UP_LINE_STYLES } from '../login/login.styles';
import { FormChangePropTypes } from './set-pass.types';

const SetPassword = () => {
  const history = useHistory();

  const { pendingUser, setPendingUser } = useAuth();

  const [showResendMsg, setShowResendMsg] = useState(false);

  const [state, dispatch] = useReducer(setPassReducer, setPassInitialState);

  const { resetOrRegister } = useParams();

  const isRegistrationFlow = !resetOrRegister || resetOrRegister !== 'reset';

  const onFormChange = (change: FormChangePropTypes) =>
    dispatch({ type: 'SET_PASSWORD_FORM_CHANGE', change });

  const resendActivationLink = () => {
    forgotPasswordApi({ email: pendingUser?.email || '' }).then((res) => {
      if (res.success && pendingUser?.email) {
        setPendingUser({ name: 'User', email: pendingUser.email });
        setShowResendMsg(true);
      }
    });
  };

  const onSetPassFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const codeValidation = codeValidator(state.code);
    const passwordValidation = passwordValidator(state.password);
    const cPasswordValidation = confirmPassValidator(
      state.password,
      state.confirmPassword
    );

    if (
      !codeValidation.valid ||
      !passwordValidation.valid ||
      !cPasswordValidation.valid
    ) {
      dispatch({
        type: 'SET_PASSWORD_VALIDATION_CHANGE',
        change: {
          codeError: codeValidation.errorMsg,
          passwordError: passwordValidation.errorMsg,
          confirmPasswordError: cPasswordValidation.errorMsg,
        },
      });
      return;
    }

    dispatch({ type: 'SET_PASSWORD_SUBMIT' });

    setPasswordApi({
      password: state.password,
      otp: +state.code,
      email: pendingUser?.email || '',
    }).then((res) => {
      if (res.success) {
        dispatch({ type: 'SET_PASSWORD_SUCCESS' });
      } else {
        dispatch({
          type: 'SET_PASSWORD_ERROR',
          errorMsg: res.error.message,
        });
      }
    });
  };
  const getMainHeading = (): string => {
    if (state.passwordSetSuccessfully) {
      return isRegistrationFlow
        ? 'Sign Up successfull'
        : 'Password reset successfully';
    }
    return isRegistrationFlow ? 'Compete registration' : 'Reset password';
  };

  const getSubHeading = (): string => {
    if (state.passwordSetSuccessfully) {
      return isRegistrationFlow
        ? messages.REGISTRATION_SUCCESS
        : messages.PASSWORD_RESET_SUCCESS;
    }
    return isRegistrationFlow
      ? messages.COMPLETE_REGISTRATION_WITH_CODE
      : messages.COMPLETE_RESET_PASSWORD_WITH_CODE;
  };

  return (
    <VyboAccountTemplate>
      {{
        topContent: state.passwordSetSuccessfully ? undefined : (
          <VyboAccountSuccessMsg>
            {/* TODO solve this */}
            {showResendMsg
              ? 'Code resent to email address'
              : 'A code has been sent to you by email'}
          </VyboAccountSuccessMsg>
        ),
        mainHeading: getMainHeading(),
        subHeading: getSubHeading(),
        mainContent: (() => {
          if (state.passwordSetSuccessfully) {
            return (
              <VyboAccountButton
                onClick={() => history.push('/login')}
                hasError={false}
              >
                Login & Start Whiteboarding
              </VyboAccountButton>
            );
          }
          return (
            <>
              <VyboInputBox
                iconAlt="code"
                placeholder="Enter 6 digit key"
                iconSource={VerificationKeySvg}
                type="text"
                error={state.codeError || undefined}
                value={state.code}
                onChange={(e) => onFormChange({ code: e.target.value })}
              />

              <VyboInputPassword
                placeholder="New password"
                error={state.passwordError || undefined}
                value={state.password}
                onChange={(e) => onFormChange({ password: e.target.value })}
              />

              <VyboInputPassword
                placeholder="Confirm new password"
                error={state.confirmPasswordError || undefined}
                value={state.confirmPassword}
                onChange={(e) =>
                  onFormChange({ confirmPassword: e.target.value })
                }
              />

              {state.error && (
                <VyboAccountErrorMsg>{state.error}</VyboAccountErrorMsg>
              )}

              <VyboAccountButton
                onClick={onSetPassFormSubmit}
                hasError={!!state.error}
                disabled={state.submitting}
              >
                {isRegistrationFlow ? 'Proceed' : 'Reset password'}
              </VyboAccountButton>

              <p style={SIGN_UP_LINE_STYLES}>
                Did not receive the code?
                <Button
                  variant="link"
                  onClick={resendActivationLink}
                  style={{
                    textDecoration: 'underline',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    textDecorationThickness: '1em',
                    color: '#0093FF',
                    outline: 'none',
                    border: '0px',
                    boxShadow: 'none',
                  }}
                >
                  RESEND CODE
                </Button>
              </p>
            </>
          );
        })(),
        bottomContent: state.passwordSetSuccessfully ? undefined : (
          <p style={{ ...SIGN_UP_LINE_STYLES, justifyContent: 'space-around' }}>
            <Link
              to="/forgot-password"
              style={{
                textDecoration: 'none',
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              CHANGE EMAIL
            </Link>
            <Link
              to="/login"
              style={{
                color: '#fff',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              LOG IN
            </Link>
          </p>
        ),
      }}
    </VyboAccountTemplate>
  );
};

export default SetPassword;
