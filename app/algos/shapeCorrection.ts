// max y - x - top
// max x - y - right
import paper, { Point, Path } from 'paper';
import MainConfig from 'config/main.config';

class ShapeCorrectionUtil {
  static distance(point1: paper.Point, point2: paper.Point): number {
    return (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2;
  }

  static distanceArr(point1: NumberTuple, point2: NumberTuple): number {
    return Math.floor(
      Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2)
    );
  }

  /**
   * @returns {boolean}
   */
  static checkIfClosePaths(
    stroke1: NumberTuple[],
    stroke2: NumberTuple[]
  ): boolean {
    const firtPointOfStroke1 = stroke1[0];
    const lastPointOfStroke1 = stroke1[stroke1.length - 1];
    const lastPointOfStroke2 = stroke2[stroke2.length - 1];

    return (
      this.distanceArr(firtPointOfStroke1, lastPointOfStroke2) <=
        MainConfig.getMinDistToAutoCorrect() ||
      this.distanceArr(lastPointOfStroke1, lastPointOfStroke2) <=
        MainConfig.getMinDistToAutoCorrect()
    );
  }

  static getTriangleByBounds(finalPath: paper.Path): paper.Point[] {
    const {
      topLeft: point1,
      topRight: point2,
      bottomLeft: point3,
      bottomRight: point4,
    } = finalPath.bounds;

    const sortedPoints = [point1, point2, point3, point4]
      .map((point) => {
        const nearestPoint = finalPath.getNearestPoint(point);
        return {
          point,
          dist: this.distance(nearestPoint, point),
          nearestPoint,
        };
      })
      .sort((a, b) => a.dist - b.dist);
    const points = [sortedPoints[0].nearestPoint, sortedPoints[1].nearestPoint];
    let bot = new Path.Line(
      new Point(this.addToTop(sortedPoints[2].point, { x: -1, y: -1 })),
      new Point(this.addToTop(sortedPoints[3].point, { x: -1, y: -1 }))
    );
    let intersections = bot.getIntersections(finalPath);
    if (!intersections[0]) {
      bot.remove();
      bot = new Path.Line(
        new Point(this.addToTop(sortedPoints[2].point, { x: 1, y: 1 })),
        new Point(this.addToTop(sortedPoints[3].point, { x: 1, y: 1 }))
      );
      intersections = bot.getIntersections(finalPath);
      bot.remove();
    }
    points.push(intersections[0].point);
    return points;
  }

  static addToTop(point: XYCoordinates, _point: XYCoordinates): XYCoordinates {
    return { x: point.x + _point.x, y: point.y + _point.y };
  }

  static getAStraightLineFromPath(
    path: paper.Path
  ): [paper.Point, paper.Point] {
    const {
      topLeft: point1,
      topRight: point2,
      bottomLeft: point3,
      bottomRight: point4,
    } = path.bounds;

    const boundingRectPoints = [point1, point2, point3, point4];

    const sixPairs = this.get6PairsOf4Items(
      boundingRectPoints.map((point) => path.getNearestPoint(point))
    );

    return sixPairs.sort(
      (a, b) => this.distance(b[0], b[1]) - this.distance(a[0], a[1])
    )[0];
  }

  static get6PairsOf4Items(
    fourPoints: paper.Point[]
  ): [paper.Point, paper.Point][] {
    const combinations = new Map([
      [0, [1, 2, 3]],
      [1, [2, 3]],
      [2, [3]],
      [4, []],
    ]);
    return fourPoints
      .map((point: paper.Point, index: number) =>
        (combinations.get(index) || []).reduce(
          (
            allCombinations: [paper.Point, paper.Point][],
            pairIndex: number
          ) => {
            allCombinations.push([point, fourPoints[pairIndex]]);
            return allCombinations;
          },
          [] // start with empty erray
        )
      )
      .flat();
  }
}
export default ShapeCorrectionUtil;
