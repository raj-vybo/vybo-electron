import { ValidationReturn } from './validation.types';
import messages from '../helpers/account.messages';

const nameValidator = (name: string): ValidationReturn => {
  if (
    name === null ||
    name === undefined ||
    name === '' ||
    name.trim() === ''
  ) {
    return { valid: false, errorMsg: messages.NAME_EMPTY };
  }

  if (name.trim().length <= 3) {
    return { valid: false, errorMsg: messages.NAME_MIN_CHARS };
  }

  return { valid: true, errorMsg: null };
};

export default nameValidator;
