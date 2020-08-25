import { Subject } from 'rxjs';

export type ForgotPasswordState = {
  email: string;
  submitting: boolean;
  emailError: string | null;
  error: string | null;
};

type ForgotPasswordFormChange = {
  change: { email: string };
  type: 'FORGOT_PASS_FORM_CHANGE';
};

type ForgotPasswordFormSubmit = {
  type: 'FORGOT_PASS_SUBMIT';
};

type ForgotPasswordError = {
  type: 'FORGOT_PASS_ERROR';
  errorMsg: string;
};

type ForgotPasswordSuccess = {
  type: 'FORGOT_PASS_SUCCESS';
};

type ForgotPasswordValidationChange = {
  type: 'FORGOT_PASS_VALIDATION_CHANGE';
  change: { emailError: string | null };
};

export type ForgotPasswordActions =
  | ForgotPasswordFormChange
  | ForgotPasswordSuccess
  | ForgotPasswordError
  | ForgotPasswordValidationChange
  | ForgotPasswordFormSubmit;

export type ForgotPasswordFormChanges = Subject<{
  email: string;
}>;
