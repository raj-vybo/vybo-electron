import paper, { view } from 'paper';
import MainConfig from 'config/main.config';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import SketchGroup from 'overrides/SketchGroup';

const handlePointerMode = (
  points: Observable<DataFromVision | null>,
  sketchGroup: SketchGroup
) => {
  const pointerModePoints = points.pipe(
    filter(() => MainConfig.isPointerMode())
  );

  pointerModePoints
    .pipe(map((p: any) => new paper.Point(p.x, p.y)))
    .subscribe((point: paper.Point) => {
      pointerLine(point);
      throttle(point, 2000);
    });

  function pointerLine(point: paper.Point) {
    const myCircle = new paper.Path.Circle(point, 3);
    myCircle.fillColor = new paper.Color(pointerColor);
    myCircle.tween({ fillColor: 'white' }, 800);

    setTimeout(() => {
      myCircle.remove();
    }, 1000);
  }

  let now = Date.now();
  function throttle(point: paper.Point, ms: number) {
    const end = now + ms;
    if (now < end) {
      now = Date.now();
      highlightShapesByGroup(sketchGroup, point);
    }
  }

  const pointerColor = '#6236FF';

  // TODO Refactor This
  function distance(point1: XYCoordinates, point2: XYCoordinates): number {
    if (point1 !== null && point2 !== null) {
      return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
    }
    return 9999999;
  }

  function highlightShapesByGroup(_GROUP: paper.Group, point: paper.Point) {
    try {
      const results = _GROUP.children
        .filter(
          (path) =>
            path.data.type !== 'ErasedCircle' && path instanceof paper.Path
        )
        .map((child) => ({
          path: child,
          diff: distance((child as paper.Path).getNearestPoint(point), point),
        }))
        .sort((a, b) => a.diff - b.diff);

      const [result] = results;

      if (result && result.diff <= 50) {
        storePathInfo(result.path as paper.Path);
        result.path.strokeColor = new paper.Color(pointerColor);
        result.path.strokeWidth = result.path.data.actualStrokeWidth + 2;
        restorePathInfo(result.path as paper.Path);
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  }

  // TODO refactor so that this is not necessary
  /** @desc Store Path Color and Path Stroke Width */
  function storePathInfo(path: paper.Path) {
    try {
      if (!path.data || !path.data.actualStrokeColor) {
        const actualStrokeWidth = path.strokeWidth;
        let actualStrokeColor = 'white';
        if (path.strokeColor) {
          actualStrokeColor = path.strokeColor.toCSS(false);
        }
        if (!path.data) {
          path.data = { actualStrokeWidth, actualStrokeColor };
        } else {
          path.data = {
            ...path.data,
            actualStrokeWidth,
            actualStrokeColor,
          };
        }
      }
    } catch (error) {
      console.log(
        'Error While Resetting Highlighed Shape To Its Previous Form'
      );
    }
  }

  function restorePathInfo(path: paper.Path): void {
    setTimeout(() => {
      path.strokeColor = path.data.actualStrokeColor;
      path.strokeWidth = path.data.actualStrokeWidth;
    }, 2000);
  }
};

export default handlePointerMode;
