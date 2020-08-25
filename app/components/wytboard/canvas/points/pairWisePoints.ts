import VisionService from 'services/vision/VisionService';
import { startWith, pairwise, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

const pairWisePoints = (): Observable<PairWiseDataPoints> => {
  return VisionService.pointsStream.pipe(
    startWith(null), // Emitting first empty value to fill-in the buffer
    pairwise(),
    map(([previousPoint, currentPoint]) => {
      if (
        currentPoint !== null &&
        currentPoint.x === 0 &&
        currentPoint.y === 0 &&
        currentPoint.flag === false &&
        previousPoint !== null
      ) {
        return {
          previousPoint,
          currentPoint: {
            x: previousPoint.x,
            y: previousPoint.y,
            flag: false,
          } as DataFromVision,
        };
      }
      return { previousPoint, currentPoint };
    }),
    filter(
      ({ currentPoint }) =>
        currentPoint !== null && currentPoint.x !== 0 && currentPoint.y !== 0
    )
  );
};

export default pairWisePoints;
