import React, { FormEvent, useReducer } from 'react';
import { useHistory, Link } from 'react-router-dom';
import EmailAddressSvg from 'resources/svgs/authentication/EmailAddressSvg.svg';
import { useAuth } from 'components/account/helpers/userAuth';
import { forgotPasswordApi } from '../helpers/accountApis';

import {
  forgotPasswordReducer,
  forgotPassInitialState,
} from './forgot-pass.logic';
import VyboAccountTemplate from '../shared/VyboAccountTemplate/VyboAccountTemplate';
import VyboInputBox from '../shared/VyboInputBox/VyboInputBox';
import VyboAccountButton from '../shared/VyboSubmitButton/VyboAccountButton';
import VyboAccountErrorMsg from '../shared/VyboAccountError/VyboAccountError';
import { SIGN_UP_LINE_STYLES } from '../login/login.styles';
import emailValidator from '../validators/email.validator';

const Forgotpassword = () => {
  const history = useHistory();
  const { setPendingUser } = useAuth();

  const [state, dispatch] = useReducer(
    forgotPasswordReducer,
    forgotPassInitialState
  );

  const onFormChange = (change: { email: string }) =>
    dispatch({ type: 'FORGOT_PASS_FORM_CHANGE', change });

  const onForgotPassFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const emailValidation = emailValidator(state.email);
    if (!emailValidation.valid) {
      dispatch({
        type: 'FORGOT_PASS_VALIDATION_CHANGE',
        change: { emailError: emailValidation.errorMsg },
      });
      return;
    }

    forgotPasswordApi({ email: state.email }).then((res) => {
      if (res.success) {
        setPendingUser({ name: 'User', email: state.email });
        history.push('/set-password/reset');
      }
    });
  };

  return (
    <VyboAccountTemplate>
      {{
        mainHeading: 'Password reset',
        subHeading:
          'Enter your email address that you used to register. We will send you an email with a code to reset your password.',
        mainContent: (
          <>
            <VyboInputBox
              iconAlt="email"
              iconSource={EmailAddressSvg}
              type="text"
              placeholder="Email address"
              error={state.emailError || undefined}
              value={state.email}
              onChange={(e) => onFormChange({ email: e.target.value })}
            />

            {state.error && (
              <VyboAccountErrorMsg>{state.error}</VyboAccountErrorMsg>
            )}

            <VyboAccountButton
              onClick={onForgotPassFormSubmit}
              hasError={!!state.error}
              disabled={state.submitting}
            >
              Send Code
            </VyboAccountButton>

            {/* Refactorable for signup and login pages */}
            <p style={SIGN_UP_LINE_STYLES}>
              Remember password ? &nbsp;
              <Link
                to="/set-password/register"
                style={{
                  textDecoration: 'underline',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  textDecorationThickness: '1em',
                  color: '#0093FF',
                }}
              >
                Log In
              </Link>
            </p>
          </>
        ),
      }}
    </VyboAccountTemplate>
  );
};

export default Forgotpassword;
