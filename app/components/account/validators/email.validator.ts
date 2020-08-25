import { ValidationReturn } from './validation.types';
import messages from '../helpers/account.messages';

const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const emailValidator = (email: string): ValidationReturn => {
  if (
    email === null ||
    email === undefined ||
    email === '' ||
    email.trim() === ''
  ) {
    return { valid: false, errorMsg: messages.EMAIL_EMPTY };
  }

  if (!emailPattern.test(email)) {
    return { valid: false, errorMsg: messages.EMAIL_INVALID };
  }

  return { valid: true, errorMsg: null };
};

export default emailValidator;
