import CurveSmootheningTypes from 'constants/smoothening.types';
import { Subject } from 'rxjs/internal/Subject';

const initialState = (): PenConfigProps =>
  JSON.parse(
    JSON.stringify({
      strokeColor: '#000',
      strokeWidth: 2,
      curveType: CurveSmootheningTypes.Normal,
      showStrokes: false,
      strokeCount: 2,
      minDistanceRequiredBtwPoints: 1,
    })
  );

const PenConfigChanges = new Subject<
  { strokeColor: string } | { strokeWidth: number }
>();

let CONFIG: PenConfigProps = initialState();

const penConfig = {
  reset: () => (CONFIG = initialState()),

  set: (path: Record<string, unknown>) =>
    (Object.keys(CONFIG) as Array<keyof PenConfigProps>).forEach(
      (property) => (path[property] = CONFIG[property])
    ),
  update: (conf: Partial<PenConfigProps>) => (CONFIG = { ...CONFIG, ...conf }),
  getStrokeColor: () => CONFIG.strokeColor,
  getSmootheningType: () => CONFIG.curveType,
  getStrokeWidth: () => CONFIG.strokeWidth,
  getCurveTypes: () => ({ ...CurveSmootheningTypes }),
  getShowStrokes: () => CONFIG.showStrokes,
  getStrokeCount: () => CONFIG.strokeCount,
  getMinDistance: () => CONFIG.minDistanceRequiredBtwPoints,

  changes: PenConfigChanges,

  setChange: (change: { strokeColor: string } | { strokeWidth: number }) => {
    CONFIG = { ...CONFIG, ...change };
    PenConfigChanges.next(change);
  },
};

const immutable = Object.freeze(penConfig);

export default immutable;
