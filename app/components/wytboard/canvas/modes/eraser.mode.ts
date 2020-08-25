import SketchGroup from 'overrides/SketchGroup';
import penConfig from 'config/pen.config';
import paper from 'paper';
import MainConfig from 'config/main.config';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable } from 'rxjs/internal/Observable';

const handleEraserMode = (
  pairPoints: Observable<PairWiseDataPoints>,
  sketchGroup: SketchGroup,
  rasterGroup: paper.Group
) => {
  const eraserModePoints = pairPoints.pipe(
    filter(() => MainConfig.isEraserMode())
  );

  let eraserPath: paper.Path | null = null;
  eraserModePoints.subscribe(
    ({ previousPoint, currentPoint }: PairWiseDataPoints) => {
      if (previousPoint === null || currentPoint === null) {
        return;
      }

      if (eraserPath === null) {
        eraserPath = getNewPath(sketchGroup);
        eraserPath.strokeColor = new paper.Color(
          rasterGroup.children.length ? '#FFFFFF' : MainConfig.getCanvasColor()
        );
        eraserPath.strokeWidth = penConfig.getStrokeWidth() * 3.5;
        eraserPath.data = { type: 'ErasedCircle' };
      }

      if (currentPoint.flag === false) {
        eraserPath = null;
        return;
      }

      eraserPath.add(new paper.Point(currentPoint.x, currentPoint.y));
    }
  );

  function getNewPath(_sketchGroup: SketchGroup): paper.Path {
    const path = new paper.Path();
    penConfig.set(path);
    _sketchGroup.add(path);
    return path;
  }
};

export default handleEraserMode;
