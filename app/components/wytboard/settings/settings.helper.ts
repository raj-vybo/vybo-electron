import penConfig from 'config/pen.config';
import MainConfig from 'config/main.config';
import Modes from 'constants/canvas.modes';
import DataSharingService from 'services/data-sharing';

type PopupSettingsGeneralTypes = {
  [key: string]: { value: string | number | boolean; set: (x: any) => void };
};
const PopupSettingsState = (): PopupSettingsGeneralTypes => ({
  curveType: {
    value: penConfig.getSmootheningType(),
    set: (x: string) => penConfig.update({ curveType: x }),
  },

  showStrokes: {
    value: penConfig.getShowStrokes(),
    set: (x: boolean) => penConfig.update({ showStrokes: !!x }),
  },

  backgroundImage: {
    value: MainConfig.getBackground(),
    set: (x: number) => MainConfig.setBackground(x),
  },

  canvasColor: {
    value: MainConfig.getCanvasColor(),
    set: (x: string) => MainConfig.setCanvasColor(x),
  },
});

const PopupSettingsType = {
  General: 'GENERAL',
  Background: 'BACKGROUND_IMAGE',
};

const SidebarShortcutsHelper: Record<string, () => void> = {
  '1': () => MainConfig.setMode(Modes.Move),
  P: () => MainConfig.setMode(Modes.Move),
  p: () => MainConfig.setMode(Modes.Move),

  '2': () => MainConfig.setMode(Modes.Text),
  t: () => MainConfig.setMode(Modes.Text),
  T: () => MainConfig.setMode(Modes.Text),

  '3': () => MainConfig.setMode(Modes.Eraser),
  e: () => MainConfig.setMode(Modes.Eraser),
  E: () => MainConfig.setMode(Modes.Eraser),

  '4': () => MainConfig.setMode(Modes.Pointer),
  v: () => MainConfig.setMode(Modes.Pointer),
  V: () => MainConfig.setMode(Modes.Pointer),

  '5': () => DataSharingService.startImageSelection.next(),
  i: () => DataSharingService.startImageSelection.next(),
  I: () => DataSharingService.startImageSelection.next(),

  '6': () => DataSharingService.clearCanvas.next(),
  x: () => DataSharingService.clearCanvas.next(),
  X: () => DataSharingService.clearCanvas.next(),
};

export default {
  PopupSettingsState,
  PopupSettingsType,
  SidebarShortcutsHelper,
};
