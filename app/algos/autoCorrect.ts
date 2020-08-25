import paper, { Path, Size } from 'paper';
import api from 'api';
import SketchGroup from 'overrides/SketchGroup';
import ShapeCorrectionUtil from './shapeCorrection';
import penConfig from '../config/pen.config';

const certainShapes: string[] = [
  'rectangle',
  'circle',
  'square',
  'triangle',
  'oval',
  'cylinder',
];
const allShapesWeSupport: string[] = [
  'rectangle',
  'circle',
  'square',
  'triangle',
  'line',
  'oval',
  'cylinder',
];
const unCertainShapes = ['line'];
let lastCorrectedIndex = -1;

let lastUncertainShape: { shape: string; start: number } | null = null;

function autoCorrectShapes(
  currentStokeCount: number,
  maxStrokeCount: number,
  allStrokesAsPaths: paper.Path[],
  allStrokesAsCoardinates,
  sketchGroup: SketchGroup
) {
  const totalStrokeCount = allStrokesAsPaths.length;
  let shapeToBeDrawn: string | null = null;

  if (!maxStrokeCount || !currentStokeCount) return; // Invalid Input

  if (
    exceededLimitToCorrect(totalStrokeCount, currentStokeCount, maxStrokeCount)
  ) {
    console.log('Reached Max Limit To Correct');
    if (lastUncertainShape !== null && lastUncertainShape.shape) {
      shapeToBeDrawn = lastUncertainShape.shape;
      currentStokeCount = lastUncertainShape.start;

      console.log(
        'Found an uncertain shape at stroke count: ',
        lastUncertainShape.start,
        ' And shape is: ',
        shapeToBeDrawn
      );

      lastUncertainShape = null;
    } else {
      console.log(
        'But Did not find any uncertain shape So moving forward... : Till stroke count',
        currentStokeCount
      );
      return;
    }
  } else {
    const currentStrokesList = allStrokesAsCoardinates.slice(
      totalStrokeCount - currentStokeCount
    );
    // TODO:: refactor this
    if (currentStokeCount > 1) {
      if (
        !ShapeCorrectionUtil.checkIfClosePaths(
          currentStrokesList[0],
          currentStrokesList[1]
        )
      ) {
        console.log('Reached Max Limit To Correct');
        if (lastUncertainShape !== null && lastUncertainShape.shape) {
          shapeToBeDrawn = lastUncertainShape.shape;
          currentStokeCount = lastUncertainShape.start;

          console.log(
            'Found an uncertain shape at stroke count: ',
            lastUncertainShape.start,
            ' And shape is: ',
            shapeToBeDrawn
          );

          lastUncertainShape = null;
        } else {
          console.log(
            'But Did not find any uncertain shape So moving forward... : Till stroke count',
            currentStokeCount
          );
          return;
        }
      }
    }
  }

  const lastNPaths = allStrokesAsPaths.slice(
    totalStrokeCount - currentStokeCount
  );

  const currentStrokesList = allStrokesAsCoardinates.slice(
    totalStrokeCount - currentStokeCount
  );

  const currentPointList = currentStrokesList.flat();

  if (currentPointList.length < 2) return;

  if (currentStokeCount > 1) {
    if (
      !ShapeCorrectionUtil.checkIfClosePaths(
        currentStrokesList[0],
        currentStrokesList[1]
      )
    ) {
      return;
    }
  }

  (shapeToBeDrawn
    ? Promise.resolve(shapeToBeDrawn)
    : ourAutoCorrectAPI(currentPointList)
  ).then((shapeDetected) => {
    const finalShape =
      shapeToBeDrawn ||
      getOurDefinedShape(
        shapeDetected,
        currentStokeCount,
        maxStrokeCount,
        totalStrokeCount
      );
    if (finalShape) {
      const finalPath = joinAllPaths(lastNPaths);

      const finalShapeAsPath = drawDetectedShapeInstead(
        finalShape,
        finalPath,
        sketchGroup
      );
      if (finalShapeAsPath) {
        console.log(
          `---------- Auto correcting to ${finalShape} Done! -------- `
        );
        allStrokesAsPaths.length = totalStrokeCount - currentStokeCount;
        allStrokesAsCoardinates.length = totalStrokeCount - currentStokeCount;
        allStrokesAsPaths.push(finalShapeAsPath);
        allStrokesAsCoardinates.push(
          unCertainShapes.some((shape) => finalShape.includes(shape))
            ? currentPointList
            : [[0, 0]]
        );

        if (!unCertainShapes.some((shape) => finalShape.includes(shape))) {
          console.log(
            'Updating Last Corrected Index to be :: ',
            totalStrokeCount - currentStokeCount
          );
          lastCorrectedIndex = totalStrokeCount - currentStokeCount;
        } else {
          console.log(
            'Skipping Last Corrected Index to be :: ',
            totalStrokeCount - currentStokeCount,
            'As it is an uncertain shape'
          );
        }
      }
    } else {
      currentStokeCount += 1;
      // recursively try and detect shapes - with strokes count from 1, 2, 3, ..., end
      console.log(
        'Going to check by adding one more stroke to proccess: Last: ',
        currentStokeCount,
        ' Max: ',
        maxStrokeCount
      );
      autoCorrectShapes(
        currentStokeCount,
        maxStrokeCount,
        allStrokesAsPaths,
        allStrokesAsCoardinates,
        sketchGroup
      );
    }
  }, console.log);
}

function exceededLimitToCorrect(
  totalStrokeCount: number,
  currentStokeCount: number,
  maxStrokeCount: number
) {
  console.log({ totalStrokeCount, currentStokeCount, maxStrokeCount });
  const lastCorrectionIndexReached =
    totalStrokeCount - currentStokeCount === lastCorrectedIndex;
  const exceededMaxStrokesToProcess = maxStrokeCount - currentStokeCount <= 0;
  console.log({ lastCorrectionIndexReached, exceededMaxStrokesToProcess });
  // (If We Reached An Auto already corrected spot) OR (Exceeded max no of strokes to be proccessed)
  return lastCorrectionIndexReached || exceededMaxStrokesToProcess;
}

function joinAllPaths(paths: paper.Path[]) {
  const finalPath = paths[0];
  for (let i = 1; i < paths.length; i++) {
    finalPath.join(paths[i]);
  }
  // finalPath.closed = true;
  return finalPath;
}
/**
 * @param {paper.Path} finalPath
 */
function drawDetectedShapeInstead(
  shapeDetected: string,
  finalPath: paper.Path,
  sketchGroup: SketchGroup
) {
  let path = null;
  if (shapeDetected.includes('triangle')) {
    const resultPoints = ShapeCorrectionUtil.getTriangleByBounds(finalPath);
    path = getClosedPathFromPoints(resultPoints);
    path.position = finalPath.position;
    sketchGroup.add(path, 1);
    // finalPath.remove();
  } else if (
    shapeDetected.includes('square') ||
    shapeDetected.includes('rectangle')
  ) {
    path = new Path.Rectangle(finalPath.bounds.point, finalPath.bounds.size);
    setClosedPathProps(path);
    path.position = finalPath.position;
    sketchGroup.add(path, 1);
    // finalPath.remove();
  } else if (shapeDetected.includes('circle')) {
    const radius =
      Math.max(finalPath.bounds.height, finalPath.bounds.width) / 2;
    path = new Path.Circle(finalPath.bounds.center, new Size(radius, radius));
    setClosedPathProps(path);
    path.position = finalPath.position;
    sketchGroup.add(path, 1);
    // finalPath.remove();
  } else if (shapeDetected.includes('oval')) {
    path = new Path.Circle(
      finalPath.bounds.center,
      new Size(finalPath.bounds.width / 2, finalPath.bounds.height / 2)
    );
    setClosedPathProps(path);
    path.position = finalPath.position;
    sketchGroup.add(path, 1);
    // finalPath.remove();
  } else if (shapeDetected.includes('cylinder')) {
    path = new Path();
    path.add(finalPath.bounds.topLeft);
    path.add(finalPath.bounds.bottomLeft);
    path.add(finalPath.bounds.bottomRight);
    path.add(finalPath.bounds.topRight);
    const centerX =
      (finalPath.bounds.topLeft.x + finalPath.bounds.topRight.x) / 2;
    const centerY =
      (finalPath.bounds.topLeft.y + finalPath.bounds.topRight.y) / 2;

    const diff = Math.min(finalPath.bounds.height / 5, 10);
    path.add([centerX, centerY - diff]);
    path.add(finalPath.bounds.topLeft);
    path.add([centerX, centerY + diff]);
    path.add(finalPath.bounds.topRight);

    path.smooth({ type: 'geometric', from: 1, to: 2, factor: 0.4 });
    path.smooth({ type: 'catmull-rom', from: 3, to: 5, factor: 0.3 });
    path.smooth({ type: 'continuous', from: 5, to: 7, factor: 0 });

    path.strokeColor = new paper.Color(penConfig.getStrokeColor());
    path.strokeWidth = penConfig.getStrokeWidth();

    sketchGroup.add(path, 1);

    // finalPath.remove();
  } else if (shapeDetected.includes('line')) {
    const [point1, point2] = ShapeCorrectionUtil.getAStraightLineFromPath(
      finalPath
    );
    path = new Path.Line(point1, point2);
    setClosedPathProps(path);
    path.position = finalPath.position;
    sketchGroup.add(path, 1);
    // finalPath.remove();
  }
  return path;
}

function getOurDefinedShape(
  { label }: { label: string },
  start: number,
  end: number,
  totalStrokeCount: number
) {
  const shapeFromAPI = label.toLowerCase();
  if (!allShapesWeSupport.some((shape) => shapeFromAPI.includes(shape))) {
    return null;
  }

  if (
    totalStrokeCount === 1 ||
    certainShapes.some((shape) => shapeFromAPI.includes(shape)) ||
    start === end
  ) {
    console.log('Shape correction Confirmed As :', shapeFromAPI);
    return shapeFromAPI;
  }
  if (unCertainShapes.some((shape) => shapeFromAPI.includes(shape))) {
    console.log(
      `Saved last ${start} strokes as uncertain But not confirming it::`,
      shapeFromAPI
    );
    lastUncertainShape = { start, end, shape: shapeFromAPI };
  }
  return null;
}

function getClosedPathFromPoints(
  points: paper.Point[],
  color: string = penConfig.getStrokeColor()
) {
  const path = new Path();
  points.forEach((p) => path.add(p));
  setClosedPathProps(path, color);
  return path;
}

function setClosedPathProps(
  path: paper.Path,
  color: string = penConfig.getStrokeColor()
) {
  path.closed = true;
  path.strokeColor = new paper.Color(color);
  path.strokeWidth = penConfig.getStrokeWidth();
}

function ourAutoCorrectAPI(strokes) {
  return api
    .post('/shape-detection', JSON.stringify(strokes), {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
}

export default autoCorrectShapes;
