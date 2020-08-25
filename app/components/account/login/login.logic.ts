import {
  LoginState,
  LoginActions,
  FormValidationPropTypes,
  FormChangePropTypes,
} from './login.types';
import { emailValidator, passwordValidator } from '../validators';

export const initialLoginState: LoginState = {
  email: '',
  password: '',
  submitting: false,
  emailError: null,
  passwordError: null,
  error: null,
};

export const loginValidators = {
  EMAIL: emailValidator,
  PASSWORD: passwordValidator,
  BOTH: ({ email, password }: { password: string; email: string }) => {
    return {
      password: passwordValidator(password),
      email: emailValidator(email),
    };
  },
};

const removeValidationError = (
  change: FormChangePropTypes
): FormValidationPropTypes => {
  if ('password' in change) {
    return { passwordError: null };
  }
  return { emailError: null };
};

export const loginReducer = (
  state: LoginState,
  action: LoginActions
): LoginState => {
  switch (action.type) {
    case 'LOGIN_FORM_CHANGE':
      return {
        ...state,
        ...action.change,
        ...removeValidationError(action.change),
      };
    case 'FORM_VALIDATION_CHANGE':
      return { ...state, ...action.change };
    case 'LOGIN_FORM_SUBMIT':
      return { ...state, submitting: true };
    case 'LOGIN_ERROR':
      return { ...state, submitting: false, error: action.errorMsg };
    case 'LOGIN_SUCCESS':
      return { ...state, submitting: false, email: '', password: '' };
    default:
      return state;
  }
};
