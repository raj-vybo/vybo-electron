/** @desc  Signup State */
export type SignupState = {
  name: string;
  email: string;
  submitting: boolean;
  error: string | null;
  nameError: string | null;
  emailError: string | null;
};

export type FormValidationPropTypes =
  | { nameError: string | null }
  | { emailError: string | null };

export type FormChangePropTypes = { name: string } | { email: string };

/*  Signup  Actions */
type FormDataChangeAction = {
  type: 'FORM_DATA_CHANGE';
  change: { name: string } | { email: string };
};

type FormValidationAction = {
  type: 'FORM_VALIDATION_CHANGE';
  change:
    | { nameError: string | null }
    | { emailError: string | null }
    | { nameError: string | null; emailError: string | null };
};

type FormSubmitAction = {
  type: 'FORM_SUMBIT';
};

type SignupErrorAction = {
  type: 'SIGNUP_ERROR';
  errorMsg: string;
};

type SignupSuccessAction = {
  type: 'SIGNUP_SUCCESS';
};

export type SignupAction =
  | FormDataChangeAction
  | FormSubmitAction
  | SignupErrorAction
  | SignupSuccessAction
  | FormValidationAction;

/*  Signup Validations */

export type NameAndEmail = {
  name: string;
  email: string;
};

export type SignupValidatorType = 'EMAIL' | 'NAME' | 'BOTH';
