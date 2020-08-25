import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import CurveSmootheningTypes from 'constants/smoothening.types';
import SettingsGeneralSvg from 'resources/svgs/settings/SettingsGeneralSvg';
import SettingsBackgroundSvg from 'resources/svgs/settings/SettingsBackground';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Images from 'resources/images/backgrounds';
import MainConfig from 'config/main.config';
import SettingsHelper from './settings.helper';
import SettingsPopupButton from './SettingsPopupButton';
import BoardColorItem from './BoardColorItem';

import {
  VYBO_POPUP_BODY_STYLES,
  SETTING_POPUP_MAIN_WRAPPER_STYLES,
  VYBO_POPUP_HEADER_STYLES,
  SETTINGS_POPUP_SIDEBAR_STYLES,
  SETTINGS_POPUP_WORKING_AREA_STYLES,
} from './settings.styles';

const { PopupSettingsType, PopupSettingsState } = SettingsHelper;
const VyboPopupSettings = ({
  showPopup,
  closePopup,
}: {
  showPopup: boolean;
  closePopup: () => void;
}) => {
  const modalRef = React.createRef();
  console.log('PopupSettingsState()', PopupSettingsState());
  const [
    { curveType, showStrokes, backgroundImage, canvasColor },
    setSettings,
  ] = useState(() => PopupSettingsState());

  const [currentSettingsTab, setCurrentSettingsTab] = useState(
    () => PopupSettingsType.General
  );

  const handleSettingsChange = ([key, value]: [string, any]) => {
    setSettings((settings) => {
      settings[key].set(value);
      return { ...settings, [key]: { ...settings[key], value } };
    });
  };

  return (
    <Modal
      ref={modalRef}
      show={showPopup}
      onHide={closePopup}
      size="lg"
      centered
      backdrop
      keyboard={false}
      id="settingsPopup"
    >
      <Modal.Body style={VYBO_POPUP_BODY_STYLES}>
        <p style={VYBO_POPUP_HEADER_STYLES}>Settings</p>

        <div>
          <div style={SETTING_POPUP_MAIN_WRAPPER_STYLES}>
            <div style={SETTINGS_POPUP_SIDEBAR_STYLES}>
              <SettingsPopupButton
                active={PopupSettingsType.General === currentSettingsTab}
                SvgElement={SettingsGeneralSvg}
                onClick={() => setCurrentSettingsTab(PopupSettingsType.General)}
              >
                General
              </SettingsPopupButton>
              <SettingsPopupButton
                active={PopupSettingsType.Background === currentSettingsTab}
                SvgElement={SettingsBackgroundSvg}
                onClick={() =>
                  setCurrentSettingsTab(PopupSettingsType.Background)
                }
              >
                Background
              </SettingsPopupButton>
            </div>
            {PopupSettingsType.General === currentSettingsTab && (
              <div style={SETTINGS_POPUP_WORKING_AREA_STYLES}>
                <h6 className="mt-1 mb-3 font-weight-bold">General Settings</h6>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Board Color
                    </Form.Label>

                    <Col sm="8" className="mt-2">
                      <div className="d-flex flex-wrap flex-row w-50 justify-content-start">
                        {MainConfig.getCanvasColorsList().map((color) => (
                          <BoardColorItem
                            key={color}
                            color={color}
                            height={36}
                            width={36}
                            active={canvasColor.value === color}
                            onClick={() =>
                              handleSettingsChange(['canvasColor', color])
                            }
                          />
                        ))}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Pen smoothening
                    </Form.Label>

                    <Col sm="8" className="mt-2">
                      <Form.Check
                        name="penSmoothing"
                        label="Normal"
                        type="radio"
                        value={CurveSmootheningTypes.Normal}
                        checked={
                          curveType.value === CurveSmootheningTypes.Normal
                        }
                        onChange={() =>
                          handleSettingsChange([
                            'curveType',
                            CurveSmootheningTypes.Normal,
                          ])
                        }
                      />
                      <Form.Check
                        name="penSmoothing"
                        label="Linear"
                        type="radio"
                        value={CurveSmootheningTypes.Linear}
                        checked={
                          curveType.value === CurveSmootheningTypes.Linear
                        }
                        onChange={() =>
                          handleSettingsChange([
                            'curveType',
                            CurveSmootheningTypes.Linear,
                          ])
                        }
                      />
                      <Form.Check
                        name="penSmoothing"
                        label="Curvilinear"
                        type="radio"
                        value={CurveSmootheningTypes.Curvy}
                        checked={
                          curveType.value === CurveSmootheningTypes.Curvy
                        }
                        onChange={() =>
                          handleSettingsChange([
                            'curveType',
                            CurveSmootheningTypes.Curvy,
                          ])
                        }
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Highlight Stroke
                    </Form.Label>

                    <Col sm="8" className="mt-2">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label=""
                        checked={showStrokes.value as boolean}
                        onChange={() =>
                          handleSettingsChange([
                            'showStrokes',
                            !showStrokes.value,
                          ])
                        }
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            )}
            {PopupSettingsType.Background === currentSettingsTab && (
              <div>
                <h6 className="mt-4 ml-3 font-weight-bold">
                  Select a background
                </h6>

                <div className="d-flex flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((imageNo) => (
                    <Card
                      key={imageNo}
                      style={{ width: '8rem', borderWidth: '2px' }}
                      border={`${
                        backgroundImage.value === imageNo ? 'primary' : 'light'
                      }`}
                      className="d-inline-block m-3"
                      onClick={() =>
                        handleSettingsChange(['backgroundImage', imageNo])
                      }
                    >
                      <Card.Img
                        variant="top"
                        src={Images[`image${imageNo}`]}
                        style={{ height: '4rem' }}
                      />
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['esc']}
          onKeyEvent={closePopup}
        />
      </Modal.Body>
    </Modal>
  );
};

export default VyboPopupSettings;
