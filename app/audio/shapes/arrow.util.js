import { Point, Path } from 'paper';
// parameters
const headLength = 20;
const headAngle = 150;
const tailLength = 6;
const tailAngle = 110;

const draw = (callback, point, _, destroyStack) => {
  const start = { ...point };

  callback.next = (nextPoint) => {
    const end = nextPoint;
    const arrowVec = new Point(end.x - start.x, end.y - start.y);

    // parameterize {headLength: 20, tailLength: 6, headAngle: 35, tailAngle: 110}
    // construct the arrow
    const arrowHead = arrowVec.normalize(headLength);
    const arrowTail = arrowHead.normalize(tailLength);

    const p3 = end; // arrow point

    const p2 = getPlus(end, arrowHead.rotate(-headAngle)); // leading arrow edge angle
    const p4 = getPlus(end, arrowHead.rotate(headAngle)); // ditto, other side

    const p1 = getPlus(p2, arrowTail.rotate(tailAngle)); // trailing arrow edge angle
    const p5 = getPlus(p4, arrowTail.rotate(-tailAngle)); // ditto

    // specify all but the last segment, closed does that
    const trackingArrow = new Path(start, p1, p2, p3, p4, p5);
    trackingArrow.closed = true;

    trackingArrow.strokeWidth = 1;
    trackingArrow.fillColor = '#FF6666';
    trackingArrow.strokeColor = 'red';
    trackingArrow.dashArray = [2, 2];
    destroyStack.push(() => trackingArrow.remove());
  };
  callback.complete = (currentPoint, group) => {
    const end = currentPoint;
    const arrowVec = new Point(end.x - start.x, end.y - start.y);

    // parameterize {headLength: 20, tailLength: 6, headAngle: 35, tailAngle: 110}
    // construct the arrow
    const arrowHead = arrowVec.normalize(headLength);
    const arrowTail = arrowHead.normalize(tailLength);

    const p3 = end; // arrow point

    const p2 = getPlus(end, arrowHead.rotate(-headAngle)); // leading arrow edge angle
    const p4 = getPlus(end, arrowHead.rotate(headAngle)); // ditto, other side

    const p1 = getPlus(p2, arrowTail.rotate(tailAngle)); // trailing arrow edge angle
    const p5 = getPlus(p4, arrowTail.rotate(-tailAngle)); // ditto

    // specify all but the last segment, closed does that
    const finalArrow = new Path(start, p1, p2, p3, p4, p5);
    finalArrow.strokeColor = 'black';
    finalArrow.fillColor = 'black';
    finalArrow.strokeWidth = 2;
    finalArrow.data = { type: 'arrow' };
    finalArrow.closed = true;
    group.addChild(finalArrow);
  };
};

const move = (callback, point, arrow, destroyStack) => {
  arrow.selected = true;
  callback.next = (nextPoint) => {
    arrow.visible = false;
    const trackingArrow = arrow.clone();
    trackingArrow.visible = true;
    trackingArrow.strokeColor = 'red';
    trackingArrow.dashArray = [2, 2];
    trackingArrow.position = nextPoint;
    trackingArrow.selected = false;
    destroyStack.push(() => trackingArrow.remove());
  };

  callback.complete = (currentPoint, group) => {
    const finalArrow = arrow.clone();
    finalArrow.visible = true;
    finalArrow.position = currentPoint;
    finalArrow.strokeWidth = 2;
    finalArrow.selected = false;
    group.addChild(finalArrow);
    arrow.remove();
  };
};

const fill = (callback, point, arrow) => {
  arrow.selected = true;
  callback.next = null;

  callback.complete = (color) => {
    arrow.selected = false;
    arrow.fillColor = color;
    arrow.strokeColor = color;
  };
  callback.ignored = () => {
    arrow.selected = false;
  };
};

const remove = (callback, point, arrow) => {
  arrow.selected = true;
  callback.next = null;
  callback.complete = null;
  callback.complete = () => {
    arrow.remove();
  };
  callback.ignored = () => {
    arrow.selected = false;
  };
};

function getPlus(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}

export default { draw, move, remove, fill };
