import {
  SetPasswordState,
  SetPasswordActions,
  FormChangePropTypes,
  FormValidationPropTypes,
} from './set-pass.types';

import {
  passwordValidator,
  codeValidator,
  confirmPassValidator,
} from '../validators';

export const setPassInitialState: SetPasswordState = {
  code: '',
  password: '',
  confirmPassword: '',
  submitting: false,
  codeError: null,
  passwordError: null,
  confirmPasswordError: null,
  error: null,
  passwordSetSuccessfully: false,
};

export const setPasswordValidators = {
  CODE: codeValidator,
  PASSWORD: passwordValidator,
  CONFIRM_PASSWORD: confirmPassValidator,
};

const removeValidationError = (
  change: FormChangePropTypes
): FormValidationPropTypes => {
  if ('password' in change) {
    return { passwordError: null };
  }
  if ('confirmPassword' in change) {
    return { confirmPasswordError: null };
  }
  return { codeError: null };
};

export const setPassReducer = (
  state: SetPasswordState,
  action: SetPasswordActions
): SetPasswordState => {
  switch (action.type) {
    case 'SET_PASSWORD_FORM_CHANGE':
      return {
        ...state,
        ...action.change,
        ...removeValidationError(action.change),
      };
    case 'SET_PASSWORD_VALIDATION_CHANGE':
      return { ...state, ...action.change };
    case 'SET_PASSWORD_SUBMIT':
      return { ...state, submitting: true };
    case 'SET_PASSWORD_SUCCESS':
      return {
        ...state,
        password: '',
        code: '',
        confirmPassword: '',
        submitting: false,
        passwordSetSuccessfully: true,
      };
    case 'SET_PASSWORD_ERROR':
      return { ...state, error: action.errorMsg, submitting: false };
    default:
      return state;
  }
};
