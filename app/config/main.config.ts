import { Subject } from 'rxjs';
import VisionService from 'services/vision/VisionService';
import Modes from '../constants/canvas.modes';

type MainConfigProps = {
  webcamIndex: number;
  mode: string;
  backgroundImage: number;
  canvasColorList: string[];
  canvasColor: string;
  minDistanceToAutoCorrect: number;
};

const MainConfigChanges = new Subject<{
  change: keyof MainConfigProps;
  value: number | string;
}>();

const initialState = (): MainConfigProps =>
  JSON.parse(
    JSON.stringify({
      webcamIndex: 0,
      mode: Modes.Move,
      backgroundImage: 1,
      minDistanceToAutoCorrect: 30,
      canvasColor: '#FFFFFF',
      canvasColorList: [
        '#FFFFFF',
        '#090909',
        '#FCE45D',
        '#00F9FF',
        '#5D8AFC',
        '#F0953C',
      ],
    })
  );

let CONFIG: MainConfigProps = initialState();

const mainConf = {
  reset: () => (CONFIG = initialState()),
  set: (path: any) =>
    (Object.keys(CONFIG) as Array<keyof MainConfigProps>).forEach(
      (property) => (path[property] = CONFIG[property])
    ),
  update: (conf: Partial<MainConfigProps>) => (CONFIG = { ...CONFIG, ...conf }),

  isAudioMode: () => CONFIG.mode === Modes.AudioInstructions,
  isPenWritingMode: () => CONFIG.mode === Modes.Write,
  isPointerMode: () => CONFIG.mode === Modes.Pointer,
  isMoveMode: () => CONFIG.mode === Modes.Move,
  isCharecterMode: () => CONFIG.mode === Modes.Character,
  isEraserMode: () => CONFIG.mode === Modes.Eraser,

  getCurrentMode: () => CONFIG.mode,
  getWebcamIndex: () => CONFIG.webcamIndex,
  getAllModes: () =>
    (Object.keys(Modes) as Array<keyof typeof Modes>).map((key) => ({
      key,
      value: Modes[key],
    })),

  setMode: (mode: string) => {
    VisionService.pointsStream.next({
      x: 0,
      y: 0,
      flag: false,
    } as DataFromVision);
    CONFIG.mode = mode;
    setTimeout(() => MainConfigChanges.next({ change: 'mode', value: mode }));
  },

  switchMode: () => {
    VisionService.pointsStream.next({
      x: 0,
      y: 0,
      flag: false,
    } as DataFromVision);
    const mode =
      CONFIG.mode === Modes.AudioInstructions
        ? Modes.Pointer
        : Modes.AudioInstructions;
    CONFIG.mode = mode;
    setTimeout(() => MainConfigChanges.next({ change: 'mode', value: mode }));
  },
  getBackground: () => CONFIG.backgroundImage,
  setBackground: (imageNo: number) => {
    CONFIG.backgroundImage = imageNo;
    setTimeout(() =>
      MainConfigChanges.next({ change: 'backgroundImage', value: imageNo })
    );
  },

  getCanvasColorsList: () => CONFIG.canvasColorList,
  getCanvasColor: () => CONFIG.canvasColor,
  setCanvasColor: (color: string) => {
    CONFIG.canvasColor = color;
    setTimeout(() =>
      MainConfigChanges.next({ change: 'canvasColor', value: color })
    );
  },
  getMinDistToAutoCorrect: () => CONFIG.minDistanceToAutoCorrect,
  setWebcamIndex: (index: number) => (CONFIG.webcamIndex = index),
  changes: MainConfigChanges,
};

const MainConfig = Object.freeze(mainConf);

export default MainConfig;
