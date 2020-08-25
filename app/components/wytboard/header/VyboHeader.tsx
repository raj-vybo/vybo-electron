import React, { useState, useEffect } from 'react';
import paper from 'paper';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { useAuth } from 'components/account/helpers/userAuth';
import WytboardLogoSvg from 'resources/svgs/whiteboard/WytboardLogoSvg.svg';
import SettingsSvg from 'resources/svgs/whiteboard/SettingsSvg.svg';
import ExportSvg from 'resources/svgs/whiteboard/ExportSvg.svg';

import { filter } from 'rxjs/internal/operators/filter';
import MainConfig from 'config/main.config';
import Modes from 'constants/canvas.modes';
import {
  VYBO_HEADER_STYLES,
  HEADER_VYBO_LOGO_STYLES,
  HEADER_MESSAGE_STYLES,
  HEADER_USER_DROPDOWN_TOGGLE_STYLES,
} from './VyboHeaderStyles';

import VyboPopupSettings from '../settings/PopupSettings';

const VyboHeader = () => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const [message, setMessage] = useState(getMsg(MainConfig.getCurrentMode()));

  const { logout, user } = useAuth();

  const downloadCanvasImage = () => {
    const canvas = document.getElementById('mainCanvas');
    if (canvas) {
      const url = `data:image/svg+xml;utf8,${encodeURIComponent(
        paper.project.exportSVG({ asString: true }) as string
      )}`;

      const link = document.createElement('a');
      link.download = 'download.svg';
      link.href = url;
      link.click();
    }
  };

  function getMsg(mode: string): string {
    switch (mode) {
      case Modes.Pointer:
        return 'Move the pointer to highilight drawings';
      case Modes.Eraser:
        return 'Move the eraser to start erasing';
        break;
      case Modes.Text:
        return 'Click on the whiteboard to start typing';
      case Modes.Write:
        return 'Release "spacebar" to move the cursor';
      case Modes.Move:
        return 'Hold "spacebar" to draw';
      default:
        return 'Hold "spacebar" to draw';
    }
  }
  useEffect(() => {
    const modeChangeSubscription = MainConfig.changes
      .pipe(filter(({ change }) => change === 'mode'))
      .subscribe(({ value }) => {
        setMessage(getMsg(String(value)));
      });
    return () => {
      modeChangeSubscription.unsubscribe();
    };
  }, []);

  return (
    <header style={VYBO_HEADER_STYLES}>
      <div className="mx-3">
        <img
          src={WytboardLogoSvg}
          alt="Vybo Logo"
          style={HEADER_VYBO_LOGO_STYLES}
        />
        <img
          src={ExportSvg}
          alt="Export Canvas"
          style={{ marginLeft: '11.5px', cursor: 'pointer' }}
          onClick={downloadCanvasImage}
        />
        <img
          src={SettingsSvg}
          alt="Settings"
          style={{ marginLeft: '11.5px', cursor: 'pointer' }}
          onClick={() => setShowSettingsPopup(true)}
        />
      </div>

      <div>
        <p style={HEADER_MESSAGE_STYLES}>{message}</p>
      </div>

      <div>
        <Dropdown>
          <Dropdown.Toggle style={HEADER_USER_DROPDOWN_TOGGLE_STYLES}>
            {user?.name || 'User'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {showSettingsPopup && (
        <VyboPopupSettings
          closePopup={() => setShowSettingsPopup(false)}
          showPopup={showSettingsPopup}
        />
      )}
    </header>
  );
};

export default VyboHeader;
