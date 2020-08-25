import { Subject } from 'rxjs';
import imageSelection from './imageSelection';
import undoCanvas from './undeoCanvasAction';

const startImageSelection = new Subject<void>();
const clearCanvas = new Subject<void>();

export default {
  imageSelection,
  undoCanvas,
  clearCanvas,
  startImageSelection,
};
