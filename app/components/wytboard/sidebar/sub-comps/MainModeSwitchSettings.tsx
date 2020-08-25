import React from 'react';

import TextModeSvg from 'components/wytboard/sidebar/svgs/main/TextModeSvg';
import PenModeSvg from 'components/wytboard/sidebar/svgs/main/PenModeSvg';
import EraserModeSvg from 'components/wytboard/sidebar/svgs/main/EraserModeSvg';
import ImageUploadSvg from 'components/wytboard/sidebar/svgs/main/ImageUploadSvg';
import PointerModeSvg from 'components/wytboard/sidebar/svgs/main/PointerModeSvg';
import Clearallsvg from 'components/wytboard/sidebar/svgs/main/ClearAllSvg';
import MainSettingsSvg from 'components/wytboard/sidebar/svgs/main/MainSettingSvg';

import DataSharingService from 'services/data-sharing';
import Modes from 'constants/canvas.modes';
import MainConfig from 'config/main.config';

import { MAIN_SETTINGS_PANEL_SETTINGS } from '../VyboSidebarStyles';

const MainModeSwitchSettings = ({ currentMode }: { currentMode: string }) => {
  return (
    <div style={MAIN_SETTINGS_PANEL_SETTINGS}>
      <MainSettingsSvg
        SvgElement={PenModeSvg}
        hoverText="Pencil  (P or 1)"
        active={currentMode === Modes.Move || currentMode === Modes.Write}
        onMouseClick={() => MainConfig.setMode(Modes.Move)}
      />
      <MainSettingsSvg
        SvgElement={TextModeSvg}
        hoverText="Text  (T or 2)"
        active={currentMode === Modes.Text}
        onMouseClick={() => MainConfig.setMode(Modes.Text)}
      />
      <MainSettingsSvg
        SvgElement={EraserModeSvg}
        hoverText="Eraser  (E or 3)"
        active={currentMode === Modes.Eraser}
        onMouseClick={() => MainConfig.setMode(Modes.Eraser)}
      />
      <MainSettingsSvg
        SvgElement={PointerModeSvg}
        hoverText="Pointer  (V or 4)"
        active={currentMode === Modes.Pointer}
        onMouseClick={() => MainConfig.setMode(Modes.Pointer)}
      />
      <MainSettingsSvg
        SvgElement={ImageUploadSvg}
        hoverText="Insert  (I or 5)"
        active={false}
        onMouseClick={() => DataSharingService.startImageSelection.next()}
      />
      <MainSettingsSvg
        SvgElement={Clearallsvg}
        hoverText="Clear All  (X or 6)"
        onMouseClick={() => DataSharingService.clearCanvas.next()}
        active={false}
      />
    </div>
  );
};

export default MainModeSwitchSettings;
