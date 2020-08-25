type DataFromVision = {
  x: number;
  y: number;
  flag: boolean;
  img: string;
  text: string;
  id: number;
};

type XYCoordinates = { x: number; y: number };

type NumberTuple = [number, number];

type PenConfigurations =
  | 'strokeColor'
  | 'strokeWidth'
  | 'curveType'
  | 'showStrokes'
  | 'strokeCount'
  | 'minDistanceRequiredBtwPoints';

type PenConfigProps = {
  strokeColor: string;
  strokeWidth: number;
  curveType: string;
  showStrokes: boolean;
  strokeCount: number;
  minDistanceRequiredBtwPoints: number;
};

type ImageConfigProps = {
  qualityPercentage: number;
  compressionPercentage: number;
  width: number;
  height: number;
  resolutionChanged: boolean;
};

type PairWiseDataPoints = {
  previousPoint: DataFromVision | null;
  currentPoint: DataFromVision | null;
};

type VyboUser = {
  name: string;
  email: string;
  token?: string;
  loginDone?: boolean;
};
