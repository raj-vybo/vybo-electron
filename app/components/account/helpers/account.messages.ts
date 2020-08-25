const messages = {
  VERIFICATION_CODE_EMPTY: 'Code cannot be empty',
  VERIFICATION_CODE_ONLY_NUMS:
    'Code cannot cannot contain chars other than numbers',
  VERIFICATION_CODE_LENGTH: 'Code must have exactly 6 digits',
  PASSWORD_EMPTY: 'Password cannot be empty',
  // TODO Remove this
  PASSWORD_BEFORE_CONFIRM_PASSWORD: '',
  // TODO Remove this
  VALID_PASSWORD_BEFORE_CONFIRM_PASSWORD: '',
  PASSWORD_MIN_CHARS: 'Password must have min 5 chars',
  CONFIRM_PASSWORD_MISMATCH: `Confirm Password doesnt match password`,
  NAME_EMPTY: 'Name cannot be empty',
  NAME_MIN_CHARS: 'Name should be atleast 4 chars',
  EMAIL_EMPTY: 'Email cannot be empty',
  EMAIL_INVALID: 'Invalid email address',
  FEEDBACK_SUCCESS_MESSAGE: 'Thank you for your valuable feedback!',
  REGISTRATION_SUCCESS:
    'Great! You have successfully created your account. Let’s get whiteboarding.',
  PASSWORD_RESET_SUCCESS:
    'Your new password has been successfully reset. Please log in with your new credentials.',
  EMAIL_SENT:
    'An email has been sent to your account with a verification code.',
  COMPLETE_REGISTRATION_WITH_CODE:
    'A code has been sent to you by email. Please enter it below and complete your registration',
  COMPLETE_RESET_PASSWORD_WITH_CODE:
    'A code has been sent to you by email. Please enter it below and reset your password',
};

export default messages;
