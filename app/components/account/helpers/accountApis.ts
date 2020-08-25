import vyboApi from 'api/vyboApi';
import { LoginResponse } from '../login/login.types';

type VyboApiResponse = {
  success: boolean;
  data: any;
  error: {
    code: number;
    message: string;
  };
};

/** ************************** User Feedback API ***************************** */

type FeedbackAPIInput = {
  token: string;
  comment: string;
  rating: number;
  feedbacks: string[];
};
export const submitFeedbackApi = ({
  token,
  comment,
  rating,
  feedbacks,
}: FeedbackAPIInput): Promise<VyboApiResponse> => {
  const config = {
    headers: { Authorization: `Bearer ${token || ''}` },
  };

  return vyboApi
    .post(
      '/submit-feedback',
      {
        data: JSON.stringify({
          comment,
          rating,
          feedbacks,
        }),
      },
      config
    )
    .then((res) => res.data);
};

/** ************************** Set Password API ***************************** */

type SetPasswordAPIInput = {
  email: string;
  otp: number;
  password: string;
  isSignupFlow: boolean;
  machineId: string;
};
export const setPasswordApi = (
  data: SetPasswordAPIInput
): Promise<VyboApiResponse> => {
  return vyboApi.post('/update-password', data).then((res) => res.data);
};

/** ************************** Forgot Password API ***************************** */

type ForgotPasswordAPIInput = { email: string };
export const forgotPasswordApi = (
  data: ForgotPasswordAPIInput
): Promise<VyboApiResponse> => {
  return vyboApi.post('/forgot-password', data).then((res) => res.data);
};

/** ************************** Signup / Register User API ***************************** */

type SignupApiInput = {
  name: string;
  email: string;
};
export const signupApi = (data: SignupApiInput): Promise<VyboApiResponse> => {
  return vyboApi.post('/register', data).then((res) => res.data);
};

/** ************************** Login User API ***************************** */

type LoginApiInput =
  | {
      email: string;
      password: string;
      machineId: string;
    }
  | {
      machineId: string;
    };

export const loginApi = (data: LoginApiInput): Promise<LoginResponse> => {
  return vyboApi.post('/login', data).then((res) => res.data);
};

/** ************************** Logout User API ***************************** */

type LogoutApiInput = {
  machineId: string;
};

export const logoutApi = (data: LogoutApiInput): Promise<void> => {
  return vyboApi.post('/logout', data);
};

/** ************************** --------------- ***************************** */
