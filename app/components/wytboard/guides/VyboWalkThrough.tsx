import React, { useState } from 'react';
import { useAuth } from 'components/account/helpers/userAuth';
import CameraSelectionScreen from 'components/wytboard/guides/camera-selection/CameraSelection';
import ColorSelection from 'components/wytboard/guides/color-selection/ColorSelection';
import VyboTutorial from 'components/wytboard/guides/tutorial/VyboTutorial';
import Keyboardshortcuts from 'components/wytboard/settings/KeyboardShortcuts';

enum VyboInitialSteps {
  CAMERA_SELECTION,
  VYBO_TUTORIAL,
  COLOR_SELECTION,
  ALL_DONE,
}

const VyboWalkthrough = () => {
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(
    VyboInitialSteps.CAMERA_SELECTION
  );

  if (currentStep === VyboInitialSteps.CAMERA_SELECTION) {
    return (
      <CameraSelectionScreen
        showCamera
        finishCameraSetup={() => {
          setCurrentStep(() => {
            if (user?.loginDone) {
              return VyboInitialSteps.COLOR_SELECTION;
            }
            return VyboInitialSteps.VYBO_TUTORIAL;
          });
        }}
      />
    );
  }

  if (currentStep === VyboInitialSteps.COLOR_SELECTION) {
    return (
      <ColorSelection
        show
        finishSelection={() => setCurrentStep(VyboInitialSteps.ALL_DONE)}
      />
    );
  }

  if (currentStep === VyboInitialSteps.VYBO_TUTORIAL) {
    return (
      // <Keyboardshortcuts />
      <VyboTutorial
        showTutorial
        finishTutorial={() => setCurrentStep(VyboInitialSteps.ALL_DONE)}
      />
    );
  }

  return <Keyboardshortcuts />;
};

export default VyboWalkthrough;
