import SketchGroup from 'overrides/SketchGroup';
import penConfig from 'config/pen.config';
import MainConfig from 'config/main.config';
import { Observable } from 'rxjs/internal/Observable';
import autoCorrectShapes from 'algos/autoCorrect';
import paper from 'paper';
import penEventPoints from '../points/penEventPoints';

const handlePenMode = (
  points: Observable<DataFromVision | null>,
  sketchGroup: SketchGroup,
  allStrokesAsPaths: paper.Path[],
  allStrokesAsCoardinates: any
) => {
  const { penDownEvents, penUpEvents, penMoveEvents } = penEventPoints(points);
  penDownEvents.subscribe(penDown);
  penUpEvents.subscribe(penUp);
  penMoveEvents.subscribe(penMove);

  let penPath = getNewPath(sketchGroup);

  function penDown(point: any) {
    if (penPath) {
      penPath.selected = false;
    }
    penPath = getNewPath(sketchGroup);
    penPath.selected = penConfig.getShowStrokes();
    penPath.add(point);
  }

  let lastPenMovePoint: any = null;
  function penMove(point: any) {
    if (
      !lastPenMovePoint ||
      distance(lastPenMovePoint, point) >= penConfig.getMinDistance()
    ) {
      penPath.add(point);
      lastPenMovePoint = point;
    }
  }

  function penUp() {
    penPath.selected = false;
    keepTrackOfPaths(penPath, allStrokesAsPaths, allStrokesAsCoardinates);

    if (MainConfig.isPenWritingMode()) {
      autoCorrectShapes(
        1,
        penConfig.getStrokeCount(),
        allStrokesAsPaths,
        allStrokesAsCoardinates,
        sketchGroup
      );
    }

    const curveType = penConfig.getSmootheningType();
    if (curveType === 'flatten') {
      penPath.flatten(20);
    } else if (curveType === 'smooth') {
      penPath.smooth({ type: 'catmull-rom', factor: 1 });
    } else {
      penPath.simplify();
    }
  }

  function getNewPath(_sketchGroup: SketchGroup): paper.Path {
    const path = new paper.Path();
    penConfig.set(path);
    _sketchGroup.add(path);
    return path;
  }
  function distance(point1: XYCoordinates, point2: XYCoordinates): number {
    if (point1 !== null && point2 !== null) {
      return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
    }
    return 9999999;
  }

  function keepTrackOfPaths(
    _penPath: paper.Path,
    actualPaths: paper.Path[],
    allPathCoordinates: any
  ): void {
    const streamedPoints = _penPath.segments.map((s: paper.Segment) => {
      const [, x, y] = s.toJSON();
      return [x, y];
    });
    actualPaths.push(_penPath);
    allPathCoordinates.push(streamedPoints);
  }
};

export default handlePenMode;
