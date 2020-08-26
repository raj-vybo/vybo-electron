import React, { FormEvent, useReducer } from 'react';
import EmailAddressSvg from 'resources/svgs/authentication/EmailAddressSvg.svg';
import UsernameSvg from 'resources/svgs/authentication/UsernameSvg.svg';
import { useHistory, Link } from 'react-router-dom';
import nameValidator from '../validators/name.validator';
import emailValidator from '../validators/email.validator';
import { signupReducer, initialSignupState } from './signup.logic';
import { useAuth } from '../helpers/userAuth';
import { signupApi } from '../helpers/accountApis';
import { FormChangePropTypes } from './signup.types';
import VyboAccountButton from '../shared/VyboSubmitButton/VyboAccountButton';
import VyboAccountErrorMsg from '../shared/VyboAccountError/VyboAccountError';
import VyboInputBox from '../shared/VyboInputBox/VyboInputBox';
import VyboAccountTemplate from '../shared/VyboAccountTemplate/VyboAccountTemplate';
import { SIGN_UP_LINE_STYLES } from '../login/login.styles';

const Signup = () => {
  const [state, dispatch] = useReducer(signupReducer, initialSignupState);
  const { setPendingUser } = useAuth();

  const history = useHistory();

  const onFormChange = (change: FormChangePropTypes) =>
    dispatch({ type: 'FORM_DATA_CHANGE', change });

  const onSignupFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const nameValidation = nameValidator(state.name);
    const emailValidation = emailValidator(state.email);

    if (!nameValidation.valid || !emailValidation.valid) {
      dispatch({
        type: 'FORM_VALIDATION_CHANGE',
        change: {
          nameError: nameValidation.errorMsg,
          emailError: emailValidation.errorMsg,
        },
      });

      return;
    }

    dispatch({
      type: 'FORM_SUMBIT',
    });

    signupApi({ name: state.name, email: state.email }).then(
      ({ success, error }) => {
        if (success) {
          setPendingUser({ name: state.name, email: state.email });

          dispatch({
            type: 'SIGNUP_SUCCESS',
          });

          history.push('/set-password/register');
        } else {
          dispatch({
            type: 'SIGNUP_ERROR',
            errorMsg: error.message,
          });
        }
      }
    );

    e.preventDefault();
  };

  return (
    <VyboAccountTemplate>
      {{
        mainContent: (
          <>
            <VyboInputBox
              iconAlt="username"
              placeholder="Username "
              iconSource={UsernameSvg}
              type="text"
              error={state.nameError || undefined}
              value={state.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
            />

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
              onClick={onSignupFormSubmit}
              hasError={!!state.error}
              disabled={state.submitting}
            >
              Proceed
            </VyboAccountButton>

            {/* Refactorable for signup and login pages */}
            <p style={SIGN_UP_LINE_STYLES}>
              Already a member ? &nbsp;
              <Link
                to="/login"
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

export default Signup;
