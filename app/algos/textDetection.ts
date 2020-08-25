import penConfig from '../config/pen.config';

type BoundingPoints = {
  x_min: number;
  y_min: number;
  x_max: number;
  y_max: number;
};
class TextDetection {
  boundingPath: BoundingPoints;

  strokePathToRemove: Array<any>;

  constructor() {
    this.strokePathToRemove = [];
    this.boundingPath = {
      x_min: Number.MAX_SAFE_INTEGER,
      y_min: Number.MAX_SAFE_INTEGER,
      x_max: Number.MIN_SAFE_INTEGER,
      y_max: Number.MIN_SAFE_INTEGER,
    };
  }

  addBoundingPathPoint(point: NumberTuple): void {
    const [x, y] = point;
    if (point[0] < this.boundingPath.x_min && x >= 0) {
      this.boundingPath.x_min = x;
    }
    if (point[1] < this.boundingPath.y_min && y >= 0) {
      this.boundingPath.y_min = y;
    }
    if (point[0] > this.boundingPath.x_max) {
      this.boundingPath.x_max = x;
    }
    if (point[1] > this.boundingPath.y_max) {
      this.boundingPath.y_max = y;
    }
  }

  textDetect(
    allStrokesAsPaths: any[],
    allStrokesAsCoardinates: any[]
  ): NumberTuple[] {
    const strokeCount = penConfig.getStrokeCount();
    let strokeCoordinatesToProcess = [];
    let tempStrokeCoordinatesToProcess: NumberTuple[] = [];

    const totalStrokeCount = allStrokesAsPaths.length;

    let noOfStrokes = 0;
    let currentIndex = totalStrokeCount - 1;

    for (
      currentIndex = totalStrokeCount - 1;
      currentIndex >= 0;
      currentIndex -= 1
    ) {
      if (!allStrokesAsPaths[currentIndex].flag) {
        noOfStrokes += 1;
      }

      if (noOfStrokes === strokeCount) {
        this.strokePathToRemove = allStrokesAsPaths.slice(currentIndex);
        strokeCoordinatesToProcess = allStrokesAsCoardinates.slice(
          currentIndex
        )[0];
        tempStrokeCoordinatesToProcess = strokeCoordinatesToProcess.map(
          (point: NumberTuple) => [
            parseInt(String(point[0]), 10),
            parseInt(String(point[1]), 10),
          ]
        );
        strokeCoordinatesToProcess.forEach((point: NumberTuple) =>
          this.addBoundingPathPoint(point)
        );
      }
    }
    // call vision service to process strokes
    return tempStrokeCoordinatesToProcess;
  }

  removePath() {
    this.strokePathToRemove.forEach((path) => path.remove());
  }
}

export default TextDetection;

// const textDetection = new TextDetection();

// function addText(point: any) {
//   const whiteRectangle = new Path({
//     segments: [
//       [textDetection.boundingPath.x_min, textDetection.boundingPath.y_min],
//       [textDetection.boundingPath.x_max, textDetection.boundingPath.y_min],
//       [textDetection.boundingPath.x_max, textDetection.boundingPath.y_max],
//       [textDetection.boundingPath.x_min, textDetection.boundingPath.y_max],
//     ],
//   });

//   const textArea = new PointText({
//     content: point.text,
//     fillColor: penConfig.getStrokeColor(),
//     fontFamily: 'Courier New',
//     fontWeight: penConfig.getStrokeWidth(),
//   });

//   textArea.fitBounds(whiteRectangle.bounds, true);

//   textDetection.removePath();

//   sketchGroup.add(textArea);
//   textDetection = new TextDetection();
// }

// if (MainConfig.isCharecterMode()) {
//   console.log('Sending cordinates To CharMode');
//   const coordiantes: NumberTuple[] = textDetection.textDetect(
//     allStrokesAsPaths,
//     allStrokesAsCoardinates
//   );
//   sendCoordinateForProcess(coordiantes);
// }

// function sendCoordinateForProcess(coordiantes: NumberTuple[]) {
//   VisionService.postToSocket(
//     JSON.stringify({
//       uniqueId: '1',
//       id: new Date().getTime(),
//       data: JSON.stringify(coordiantes),
//       mode: Modes.Character,
//       scale: 5,
//     })
//   );
// }
