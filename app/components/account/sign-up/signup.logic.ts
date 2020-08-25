import {
  SignupState,
  SignupAction,
  NameAndEmail,
  FormValidationPropTypes,
  FormChangePropTypes,
} from './signup.types';
import { nameValidator, emailValidator } from '../validators';

export const initialSignupState: SignupState = {
  name: '',
  email: '',
  submitting: false,
  error: null,
  nameError: null,
  emailError: null,
};

export const signupValidator = {
  NAME: nameValidator,
  EMAIL: emailValidator,
  BOTH: ({ name, email }: NameAndEmail) => ({
    name: nameValidator(name),
    email: emailValidator(email),
  }),
};

const removeValidationError = (
  change: FormChangePropTypes
): FormValidationPropTypes => {
  if ('name' in change) {
    return { nameError: null };
  }
  return { emailError: null };
};

export const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  switch (action.type) {
    case 'FORM_DATA_CHANGE':
      return {
        ...state,
        ...action.change,
        ...removeValidationError(action.change),
      };
    case 'FORM_SUMBIT':
      return { ...state, submitting: true };
    case 'SIGNUP_ERROR':
      return { ...state, submitting: false, error: action.errorMsg };
    case 'SIGNUP_SUCCESS':
      return { ...state, submitting: false, name: '', email: '' };
    case 'FORM_VALIDATION_CHANGE':
      return { ...state, ...action.change };
    default:
      return state;
  }
};
