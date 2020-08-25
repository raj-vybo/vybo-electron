import WellLitSurroundings from 'resources/svgs/tutorial/WellLitSurroundings.svg';
import ClearBackground from 'resources/svgs/tutorial/ClearBackground.svg';
import RedBluePens from 'resources/svgs/tutorial/RedBluePens.svg';
import PenHold from 'resources/svgs/tutorial/PenHold.svg';
import PointAndDraw from 'resources/svgs/tutorial/PointAndDraw.svg';
import MaintainDistance from 'resources/svgs/tutorial/MaintainDistance.svg';
import HoldSpacebar from 'resources/svgs/tutorial/HoldSpacebar.svg';

import { TutorialStep } from './tutorial.types';

// Step 1
const UsersSurrounding: TutorialStep = {
  title: 'Surrounding',
  stepNo: 1,
  messages: {
    type: 'Double',
    heading1: 'Well lit surrounding',
    desc1: 'Ensure that the room is well lit with adequate lighting',
    img1: WellLitSurroundings,
    heading2: 'Clear background',
    desc2: 'Ensure that your background is clear of any objects',
    img2: ClearBackground,
  },
};

// Step 2
const PenColorAndHold: TutorialStep = {
  title: 'Pen',
  stepNo: 2,
  messages: {
    type: 'Double',
    heading1: 'Blue / Red pen',
    desc1: 'Use a blue or red pen with cap on for best results',
    img1: RedBluePens,
    heading2: 'Hold at the tip',
    desc2: 'Hold the pen at the tip, like you do when writing',
    img2: PenHold,
  },
};

// Step 3
const HowToDraw: TutorialStep = {
  title: 'Setup',
  stepNo: 3,
  messages: {
    type: 'Double',
    heading1: 'Point and draw',
    desc1: 'Point with the pen towards the screen and start to draw',
    img1: PointAndDraw,
    heading2: 'Maintain distance',
    desc2: 'Maintain a normal viewing distance from the laptop',
    img2: MaintainDistance,
  },
};

// Step 4
const SpacebarInstruction: TutorialStep = {
  title: 'One last tip',
  stepNo: 4,
  messages: {
    type: 'Single',
    heading: 'Hold spacebar to draw',
    desc:
      'Hold spacebar to start drawing on your whiteboard. Release it when drawing is done.',
    img: HoldSpacebar,
  },
};

const TutorialSteps: TutorialStep[] = [
  UsersSurrounding,
  PenColorAndHold,
  HowToDraw,
  SpacebarInstruction,
];

export default TutorialSteps;
