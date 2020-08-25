export type UserFeedBackState = {
  comment: string;
  rating: number | null;
  feedbacks: string[];
  submitting: boolean;
  feedbackGiven: 'NOT_YET' | 'NO' | 'YES';
};

type FeedbackSubmit = {
  type: 'FEEDBACK_SUBMIT';
};

type FeedbackSubmitSuccess = {
  type: 'FEEDBACK_SUBMIT_SUCCESS';
};

type FeedbackCancel = {
  type: 'FEEDBACK_CANCEL';
};

type FeedbackRatingsChange = {
  type: 'FEEDBACK_RATINGS_CHANGE';
  change: number;
};

type FeedbacksChange = {
  type: 'FEEDBACKS_CHANGE';
  change: string;
};

type FeedbackCommentChange = {
  type: 'FEEDBACK_COMMENT_CHANGE';
  comment: string;
};

export type UserFeedbackActions =
  | FeedbackSubmit
  | FeedbackCancel
  | FeedbackRatingsChange
  | FeedbackCommentChange
  | FeedbackSubmitSuccess
  | FeedbacksChange;
