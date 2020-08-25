import LineUtil from './shapes/line.util.js';
import CircleUtil from './shapes/circle.util.js';
import RectangleUtil from './shapes/rectangle.util.js';
import ArrowUtil from './shapes/arrow.util.js';

const perform = (action) => (shape) => {
  return getUtil(shape)[action];
};

const getUtil = (shape) => {
  switch (shape) {
    case 'line':
      return LineUtil;
    case 'circle':
      return CircleUtil;
    case 'rectangle':
      return RectangleUtil;
    case 'arrow':
      return ArrowUtil;
    default:
      return LineUtil;
  }
};

export default { perform };
