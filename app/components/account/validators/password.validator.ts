import { ValidationReturn } from './validation.types';
import messages from '../helpers/account.messages';

const passwordValidator = (password: string): ValidationReturn => {
  if (
    password === null ||
    password === undefined ||
    password === '' ||
    password.trim() === ''
  ) {
    return { valid: false, errorMsg: messages.PASSWORD_EMPTY };
  }

  if (password.trim().length < 5) {
    return { valid: false, errorMsg: messages.PASSWORD_MIN_CHARS };
  }

  return { valid: true, errorMsg: null };
};

const confirmPassValidator = (
  password: string,
  confirmPass: string
): ValidationReturn => {
  if (
    password === null ||
    password === undefined ||
    password === '' ||
    password.trim() === ''
  ) {
    return {
      valid: false,
      errorMsg: messages.PASSWORD_BEFORE_CONFIRM_PASSWORD,
    };
  }

  if (password.trim().length < 5) {
    return {
      valid: false,
      errorMsg: messages.VALID_PASSWORD_BEFORE_CONFIRM_PASSWORD,
    };
  }

  const { valid, errorMsg } = passwordValidator(confirmPass);
  if (!valid) {
    return { valid: false, errorMsg: `Confirm ${errorMsg}` };
  }

  if (password !== confirmPass) {
    return { valid: false, errorMsg: messages.CONFIRM_PASSWORD_MISMATCH };
  }
  return { valid: true, errorMsg: null };
};
export { passwordValidator, confirmPassValidator };
