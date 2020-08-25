import { Subject } from 'rxjs';

const undoCanvas = new Subject<void>();

export default undoCanvas;
