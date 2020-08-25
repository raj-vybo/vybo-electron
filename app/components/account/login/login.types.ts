export type LoginState = {
  email: string;
  password: string;
  submitting: boolean;
  emailError: string | null;
  passwordError: string | null;
  error: string | null;
};

export type FormChangePropTypes = { email: string } | { password: string };

export type FormValidationPropTypes =
  | { emailError: string | null }
  | { passwordError: string | null };

type LoginFormChange = {
  type: 'LOGIN_FORM_CHANGE';
  change: FormChangePropTypes;
};

type LoginFormSubmit = {
  type: 'LOGIN_FORM_SUBMIT';
};

type LoginFormValidationChange = {
  type: 'FORM_VALIDATION_CHANGE';
  change: { emailError: string | null } | { passwordError: string | null };
};

type LoginSubmitError = {
  type: 'LOGIN_ERROR';
  errorMsg: string;
};

type LoginSubmitSuccess = {
  type: 'LOGIN_SUCCESS';
};

export type LoginActions =
  | LoginFormChange
  | LoginFormSubmit
  | LoginFormValidationChange
  | LoginSubmitError
  | LoginSubmitSuccess;

export type LoginResponse = {
  success: boolean;
  error: any;
  data: {
    name: string;
    jwt: string;
    email: string;
    loginDone?: boolean;
  };
};
