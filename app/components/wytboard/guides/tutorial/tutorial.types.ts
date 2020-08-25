export type SingleTutorialMessage = {
  type: 'Single';
  heading: string;
  desc: string;
  img: string;
};

export type DoubleTutorialMessages = {
  type: 'Double';
  heading1: string;
  heading2: string;
  desc1: string;
  desc2: string;
  img1: string;
  img2: string;
};

export type TutorialStep = {
  stepNo: number;
  title: string;
  messages: SingleTutorialMessage | DoubleTutorialMessages;
};
