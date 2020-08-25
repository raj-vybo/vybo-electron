import { Subject } from 'rxjs';

export type SetPasswordState = {
  code: string;
  password: string;
  confirmPassword: string;
  submitting: boolean;
  codeError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  error: string | null;
  passwordSetSuccessfully: boolean;
};

export type FormChangePropTypes =
  | { code: string }
  | { password: string }
  | { confirmPassword: string };

export type FormValidationPropTypes =
  | {
      codeError: string | null;
    }
  | {
      passwordError: string | null;
    }
  | {
      confirmPasswordError: string | null;
    };

type SetPasswordFormChange = {
  type: 'SET_PASSWORD_FORM_CHANGE';
  change: FormChangePropTypes;
};

type SetPasswordSubmit = {
  type: 'SET_PASSWORD_SUBMIT';
};

type SetPasswordError = {
  type: 'SET_PASSWORD_ERROR';
  errorMsg: string;
};

type SetPasswordSuccess = {
  type: 'SET_PASSWORD_SUCCESS';
};

type SetPasswordValidationChange = {
  type: 'SET_PASSWORD_VALIDATION_CHANGE';
  change:
    | { codeError: string | null }
    | { passwordError: string | null; confirmPasswordError?: string | null };
};

export type SetPasswordActions =
  | SetPasswordFormChange
  | SetPasswordSubmit
  | SetPasswordValidationChange
  | SetPasswordError
  | SetPasswordSuccess;

export type SetPaswordFormChanges = Subject<
  | {
      code: string;
    }
  | {
      confirmPassword: string;
      password: string;
    }
>;
