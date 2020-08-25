import React, { useState, useEffect } from 'react';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import MainConfig from 'config/main.config';
import penConfig from 'config/pen.config';

import { filter } from 'rxjs/internal/operators/filter';
import settingsHelper from '../settings/settings.helper';

import MainModeSwitchSettings from './sub-comps/MainModeSwitchSettings';
import PenConfigSettings from './sub-comps/PenConfigurationSettings';
import ImageUploadToCanvas from './sub-comps/ImageUpload';

import { VYBO_SIDEBAR_STYLES } from './VyboSidebarStyles';

const VyboSidebar = () => {
  const [currentMode, setCurrentMode] = useState(MainConfig.getCurrentMode());

  const [{ strokeColor, strokeWidth }, setPenConfig] = useState({
    strokeColor: penConfig.getStrokeColor(),
    strokeWidth: penConfig.getStrokeWidth(),
  });

  useEffect(() => {
    const modeChangeSubscription = MainConfig.changes
      .pipe(filter(({ change }) => change === 'mode'))
      .subscribe(({ value }) => setCurrentMode(String(value)));
    return () => {
      modeChangeSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const penConfigChanges = penConfig.changes.subscribe((change) =>
      setPenConfig((x) => ({ ...x, ...change }))
    );
    return () => {
      penConfigChanges.unsubscribe();
    };
  }, []);

  return (
    <aside style={VYBO_SIDEBAR_STYLES}>
      <MainModeSwitchSettings currentMode={currentMode} />
      <PenConfigSettings strokeWidth={strokeWidth} strokeColor={strokeColor} />
      <ImageUploadToCanvas />
      <KeyboardEventHandler
        handleKeys={Object.keys(settingsHelper.SidebarShortcutsHelper)}
        onKeyEvent={(key: string) =>
          settingsHelper.SidebarShortcutsHelper[key]()
        }
      />
    </aside>
  );
};

export default VyboSidebar;
