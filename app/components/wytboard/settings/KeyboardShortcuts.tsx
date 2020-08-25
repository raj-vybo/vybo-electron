import { ipcRenderer } from 'electron';
import React, { useRef, useEffect, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import MainConfig from 'config/main.config';
import Modes from 'constants/canvas.modes';
import DataSharingService from 'services/data-sharing';
import Feedback from 'components/account/feedback/Feedback';

const Keyboardshortcuts = () => {
  const spacebarEventsRef = useRef(new Subject());
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const spacebarEventsSub = spacebarEventsRef.current
      .pipe(distinctUntilChanged())
      .subscribe((isSpacebarDown) => {
        if (isSpacebarDown && MainConfig.isMoveMode()) {
          MainConfig.setMode(Modes.Write);
        } else if (
          !isSpacebarDown &&
          (MainConfig.isPenWritingMode() || MainConfig.isCharecterMode())
        ) {
          MainConfig.setMode(Modes.Move);
        }
      });
    return () => {
      spacebarEventsSub.unsubscribe();
    };
  }, []);

  // TODO:: Focus events re-write
  useEffect(() => {
    document // TODO make these divs only svg clicking ones
      .querySelectorAll('div.clickable')
      .forEach(function addFocusEventListners(item) {
        item.addEventListener('focus', function blurOutOnClick() {
          item.blur();
        });
      });
    return () => {
      document
        .querySelectorAll('div.clickable')
        .forEach(function removeFocusEventListners(item) {
          item.removeEventListener('focus', function removeFocusNullifying() {
            console.log('Removing !');
          });
        });
    };
  }, []);

  // Quitting app redirect to feedback
  useEffect(() => {
    ipcRenderer.on('closing-app', () => {
      setShowFeedback(true);
    });
  }, []);

  return (
    <>
      <KeyboardEventHandler
        handleKeys={['space']}
        handleEventType="keydown"
        onKeyEvent={() => spacebarEventsRef.current.next(true)}
      />

      <KeyboardEventHandler
        handleKeys={['space']}
        handleEventType="keyup"
        onKeyEvent={() => spacebarEventsRef.current.next(false)}
      />

      <KeyboardEventHandler
        handleKeys={['ctrl+z', 'meta+z']}
        onKeyEvent={() => DataSharingService.undoCanvas.next()}
      />
      {showFeedback && <Feedback />}
    </>
  );
};

export default Keyboardshortcuts;
