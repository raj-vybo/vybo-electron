import {
  ForgotPasswordState,
  ForgotPasswordActions,
} from './forgot-pass.types';

export const forgotPassInitialState: ForgotPasswordState = {
  email: '',
  submitting: false,
  emailError: null,
  error: null,
};

export const forgotPasswordReducer = (
  state: ForgotPasswordState,
  action: ForgotPasswordActions
): ForgotPasswordState => {
  switch (action.type) {
    case 'FORGOT_PASS_FORM_CHANGE':
      return { ...state, ...action.change, emailError: null };
    case 'FORGOT_PASS_VALIDATION_CHANGE':
      return { ...state, ...action.change };
    case 'FORGOT_PASS_SUCCESS':
      return { ...state, email: '', submitting: false };
    case 'FORGOT_PASS_ERROR':
      return { ...state, submitting: false, error: action.errorMsg };
    case 'FORGOT_PASS_SUBMIT':
      return { ...state, submitting: true };
    default:
      return state;
  }
};
