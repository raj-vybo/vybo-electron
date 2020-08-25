import { ValidationReturn } from './validation.types';
import messages from '../helpers/account.messages';

const codeValidator = (code: string): ValidationReturn => {
  if (
    code === null ||
    code === undefined ||
    code === '' ||
    code.trim() === ''
  ) {
    return { valid: false, errorMsg: messages.VERIFICATION_CODE_EMPTY };
  }

  if (!/^[0-9]*$/gm.test(code)) {
    return {
      valid: false,
      errorMsg: messages.VERIFICATION_CODE_ONLY_NUMS,
    };
  }
  if (code.trim().length !== 6) {
    return { valid: false, errorMsg: messages.VERIFICATION_CODE_LENGTH };
  }

  return { valid: true, errorMsg: null };
};

export default codeValidator;
