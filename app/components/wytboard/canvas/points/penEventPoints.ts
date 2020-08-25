import { Observable } from 'rxjs/internal/Observable';
import { filter, map, startWith, pairwise } from 'rxjs/operators';
import { Point } from 'paper/dist/paper-core';
import MainConfig from 'config/main.config';

const penEventPoints = (points: Observable<DataFromVision | null>) => {
  const penModePoints = points.pipe(
    filter(() => MainConfig.isPenWritingMode() || MainConfig.isCharecterMode())
  );

  const pairWisePoints = penModePoints.pipe(
    startWith(null), // Emitting first empty value to fill-in the buffer
    pairwise(),
    map(([previousPoint, currentPoint]) => ({ previousPoint, currentPoint }))
  );

  // Filtering Pendown Events
  const penDownEvents: Observable<paper.Point> = pairWisePoints.pipe(
    filterStreamBy(
      ({ previousPoint, currentPoint }) =>
        previousPoint === null ||
        (!previousPoint.flag && currentPoint !== null && currentPoint.flag)
    )
  );

  // Filtering Penup Events
  const penUpEvents: Observable<paper.Point> = pairWisePoints.pipe(
    filterStreamBy(
      ({ previousPoint, currentPoint }) =>
        previousPoint !== null &&
        previousPoint.flag &&
        currentPoint !== null &&
        !currentPoint.flag
    )
  );

  // Filtering PenMove Events
  const penMoveEvents: Observable<paper.Point> = pairWisePoints.pipe(
    filterStreamBy(
      ({ previousPoint, currentPoint }) =>
        previousPoint !== null &&
        previousPoint.flag &&
        currentPoint !== null &&
        currentPoint.flag
    )
  );

  return { penMoveEvents, penUpEvents, penDownEvents };
};

function filterStreamBy(
  condition: ({ previousPoint, currentPoint }: PairWiseDataPoints) => boolean
) {
  return (input$: Observable<any>) =>
    input$.pipe(
      filter(condition),
      map(({ currentPoint }) => {
        const point = new Point(currentPoint as DataFromVision);
        return point;
      })
    );
}

export default penEventPoints;
