import { UserFeedBackState, UserFeedbackActions } from './feedback.types';

export const initialFeedbackState: UserFeedBackState = {
  comment: '',
  rating: null,
  feedbacks: [],
  submitting: false,
  feedbackGiven: 'NOT_YET',
};

const thresholdChanged = (actual: number | null, current: number): boolean => {
  return (actual === 5 && current !== 5) || (current === 5 && actual !== 5);
};

export const feedbackReducer = (
  state: UserFeedBackState,
  action: UserFeedbackActions
): UserFeedBackState => {
  switch (action.type) {
    case 'FEEDBACK_COMMENT_CHANGE':
      return { ...state, comment: action.comment };
    case 'FEEDBACK_RATINGS_CHANGE':
      return {
        ...state,
        rating: action.change,
        feedbacks: thresholdChanged(state.rating, action.change)
          ? []
          : state.feedbacks,
      };
    case 'FEEDBACKS_CHANGE':
      return {
        ...state,
        feedbacks: state.feedbacks.includes(action.change)
          ? state.feedbacks.filter((x) => x !== action.change)
          : [...state.feedbacks, action.change],
      };
    case 'FEEDBACK_SUBMIT':
      return { ...state, submitting: true };
    case 'FEEDBACK_CANCEL':
      return { ...state, submitting: false, feedbackGiven: 'NO' };
    case 'FEEDBACK_SUBMIT_SUCCESS':
      return { ...state, submitting: false, feedbackGiven: 'YES' };
    default:
      return state;
  }
};

export const negativeFeedbacksList = [
  'Poor pen detection',
  'Random shapes drawn',
  'App not responding',
  'Pointer hangs',
  'Difficult to use',
  'App lagging',
  'Uploaded image distorted',
];

export const positiveFeedbacksList = [
  'Pen detection',
  'Shape auto-detection',
  'User Interface',
  'Ease of use',
  'Fun to use',
];
