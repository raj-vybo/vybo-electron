import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/esm/Modal';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import TutorialSteps from './tutorial.steps';

import {
  VYBO_POPUP_BODY_STYLES,
  VYBO_POPUP_HEADER_STYLES,
  MSG_HEADING_STYLES,
  MSG_DESC_STYLES,
  DOUBLE_MSG_EACH_CONTAINER_STYLES,
  PROGRESS_BAR_STYLES,
} from './tutorial.styles';
import NavigationButton from '../nav-btn/NavigationButton';

const VyboTutorial = ({
  showTutorial,
  finishTutorial,
}: {
  showTutorial: boolean;
  finishTutorial: () => void;
}) => {
  const modalRef = React.createRef();

  const [currentStep, setCurrentStep] = useState(TutorialSteps[0]);
  const [progresses, setProgresses] = useState([0, 0, 0, 0]);

  const gotoPrevStep = () => {
    if (progresses[currentStep.stepNo - 1] !== 100) {
      setCurrentProgress(0);
    }

    if (currentStep.stepNo !== 1) {
      setCurrentStep(TutorialSteps[currentStep.stepNo - 2]);
    }
  };

  const setCurrentProgress = (progress: number) => {
    setProgresses((prevProgresses) => {
      const newProgresses = [...prevProgresses];
      newProgresses[currentStep.stepNo - 1] = progress;
      return [...newProgresses];
    });
  };

  useEffect(() => {
    // 1sec = 10 cycles => 5sec = 50 cycles With 0 it means 51
    if (progresses[currentStep.stepNo - 1] !== 100) {
      const sub = interval(100)
        .pipe(takeWhile((x) => x < 51))
        .subscribe((ticNo) => setCurrentProgress(ticNo * 2));

      return () => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      };
    }
  }, [currentStep]);

  return (
    <Modal
      ref={modalRef}
      show={showTutorial}
      // onHide={}
      size="lg"
      centered
      backdrop
      keyboard={false}
      id="cameraPopup"
    >
      <Modal.Body style={VYBO_POPUP_BODY_STYLES}>
        <p style={VYBO_POPUP_HEADER_STYLES}>{currentStep.title}</p>

        {(() => {
          if (currentStep.messages.type === 'Double') {
            return (
              <div className="d-flex align-items-center flex-row justify-content-between">
                <EachOfDoubleMsg
                  heading={currentStep.messages.heading1}
                  desc={currentStep.messages.desc1}
                  img={currentStep.messages.img1}
                />
                <EachOfDoubleMsg
                  heading={currentStep.messages.heading2}
                  desc={currentStep.messages.desc2}
                  img={currentStep.messages.img2}
                />
              </div>
            );
          }
          return (
            <div className="d-flex align-items-center flex-column justify-content-between mt-2">
              <img src={currentStep.messages.img} alt="" />
              <p style={MSG_HEADING_STYLES}>{currentStep.messages.heading}</p>
              <p style={MSG_DESC_STYLES}>{currentStep.messages.desc}</p>
            </div>
          );
        })()}

        <div className="d-flex px-3 py-4 position-relative">
          {/* GO TO PREVIOUS BUTTON */}
          {currentStep.stepNo > 1 && (
            <NavigationButton
              extraStyles={{
                backgroundColor: '#3B404E',
                borderColor: '#3B404E',
                left: '16px',
                top: '10px',
              }}
              onClick={gotoPrevStep}
              className="position-absolute"
            >
              Previous
            </NavigationButton>
          )}

          {/* CURRENT STEP No */}
          <p
            className="position-absolute font-weight-bold"
            style={{ left: '244px', top: '16px' }}
          >
            {currentStep.stepNo}
            /4
          </p>

          {/* GO TO PREVIOUS BUTTON  */}
          {currentStep.stepNo < 4 &&
            progresses[currentStep.stepNo - 1] === 100 && (
              <NavigationButton
                className="position-absolute"
                extraStyles={{ left: '400px', top: '10px' }}
                onClick={() =>
                  setCurrentStep(TutorialSteps[currentStep.stepNo])
                }
              >
                Next
              </NavigationButton>
            )}

          {/* START BUTTON  */}
          {currentStep.stepNo === 4 && progresses[3] === 100 && (
            <NavigationButton
              className="position-absolute"
              extraStyles={{ left: '400px', top: '10px' }}
              onClick={finishTutorial}
            >
              Start
            </NavigationButton>
          )}
        </div>

        <div className="d-flex justify-content-around m-3">
          <div>
            <ProgressBar style={PROGRESS_BAR_STYLES} now={progresses[0]} />
          </div>
          <div>
            <ProgressBar style={PROGRESS_BAR_STYLES} now={progresses[1]} />
          </div>
          <div>
            <ProgressBar style={PROGRESS_BAR_STYLES} now={progresses[2]} />
          </div>
          <div>
            <ProgressBar style={PROGRESS_BAR_STYLES} now={progresses[3]} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VyboTutorial;

function EachOfDoubleMsg({
  heading,
  desc,
  img,
}: {
  heading: string;
  desc: string;
  img: string;
}) {
  return (
    <div style={DOUBLE_MSG_EACH_CONTAINER_STYLES}>
      <img src={img} alt="" width="180" className="d-block mt-4" />
      <p style={MSG_HEADING_STYLES}>{heading}</p>
      <p style={MSG_DESC_STYLES}>{desc}</p>
    </div>
  );
}
