import React, { useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import MainConfig from 'config/main.config';
import BoardColorItem from 'components/wytboard/settings/BoardColorItem';
import Card from 'react-bootstrap/esm/Card';
import Images from 'resources/images/backgrounds';
import NavigationButton from '../nav-btn/NavigationButton';

import {
  VYBO_POPUP_BODY_STYLES,
  VYBO_POPUP_HEADER_STYLES,
  GRAY_BORDER_BOTTOM,
} from './ColorSelectionStyles';

const ColorSelection = ({
  show,
  finishSelection,
}: {
  show: boolean;
  finishSelection: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [canvasColor, setCanvasColor] = useState(MainConfig.getCanvasColor());

  const [backgroundImage, setBackgroundImage] = useState(
    MainConfig.getBackground()
  );

  const handleCanvasColorChange = (color: string) => {
    MainConfig.setCanvasColor(color);
    setCanvasColor(color);
  };

  const handleBackgroundChange = (background: number) => {
    MainConfig.setBackground(background);
    setBackgroundImage(background);
  };

  const modalRef = React.createRef();
  return (
    <Modal
      ref={modalRef}
      show={show}
      // onHide={}
      size="lg"
      centered
      backdrop
      keyboard={false}
      id="cameraPopup"
    >
      <Modal.Body style={VYBO_POPUP_BODY_STYLES}>
        {(() => {
          if (currentStep === 1) {
            return (
              <div style={{ height: '600px' }}>
                <p style={VYBO_POPUP_HEADER_STYLES}>Board Color</p>
                <p className="text-center font-weight-bold mt-3">
                  Select a color for your board
                </p>
                <div
                  className="d-flex flex-wrap align-items-center justify-content-center pb-3"
                  style={GRAY_BORDER_BOTTOM}
                >
                  {MainConfig.getCanvasColorsList().map((color) => (
                    <BoardColorItem
                      key={color}
                      color={color}
                      height={176}
                      width={150}
                      active={canvasColor === color}
                      onClick={() => handleCanvasColorChange(color)}
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-center my-4">
                  <NavigationButton onClick={() => setCurrentStep(2)}>
                    Next
                  </NavigationButton>
                </div>
              </div>
            );
          }
          return (
            <div style={{ height: '600px' }}>
              <p style={VYBO_POPUP_HEADER_STYLES}>Background</p>
              <p className="text-center font-weight-bold mt-3">
                Select your virtual background
              </p>
              <div
                className="d-flex flex-wrap align-items-center justify-content-center pb-3"
                style={GRAY_BORDER_BOTTOM}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((imageNo) => (
                  <Card
                    key={imageNo}
                    style={{
                      width: '146px',
                      borderWidth: '2px',
                      borderColor: `${
                        backgroundImage === imageNo
                          ? '#007AFF'
                          : 'rgb(36, 41, 54)'
                      }`,
                      cursor: 'pointer',
                      backgroundColor: 'rgb(36, 41, 54)',
                    }}
                    className="d-inline-block mx-2 my-3"
                    onClick={() => handleBackgroundChange(imageNo)}
                  >
                    <Card.Img
                      variant="top"
                      src={Images[`image${imageNo}`]}
                      style={{ height: '85px', borderRadius: '2px' }}
                    />
                  </Card>
                ))}
              </div>
              <div className="my-4" style={{ paddingLeft: '24px' }}>
                <NavigationButton
                  onClick={() => setCurrentStep(1)}
                  extraStyles={{
                    backgroundColor: '#3B404E',
                    borderColor: '#3B404E',
                  }}
                >
                  Previous
                </NavigationButton>
                <NavigationButton
                  onClick={finishSelection}
                  extraStyles={{ marginLeft: '86px' }}
                >
                  Start
                </NavigationButton>
              </div>
            </div>
          );
        })()}
      </Modal.Body>
    </Modal>
  );
};

export default ColorSelection;
