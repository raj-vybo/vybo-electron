import { Path } from 'paper';

const draw = (callback, point, _, destroyStack) => {
  const center = { ...point };
  callback.next = (_point) => {
    const trackingCircle = new Path.Circle({
      position: center,
      radius: _point.subtract(center).length,
      dashArray: [2, 2],
      strokeColor: 'red'
    });
    destroyStack.push(() => trackingCircle.remove());
  };
  callback.complete = (currentPoint, group) => {
    const circle = new Path.Circle({
      position: center,
      radius: currentPoint.subtract(center).length,
      strokeColor: 'black',
      strokeWidth: 2,
      data: { type: 'circle', radius: currentPoint.subtract(center).length }
    });
    group.addChild(circle);
  };
};

const move = (callback, point, circle, destroyStack) => {
  circle.selected = true;
  callback.next = (nextPoint) => {
    circle.visible = false;
    const trackingCircle = circle.clone();
    trackingCircle.visible = true;
    trackingCircle.strokeColor = 'red';
    trackingCircle.dashArray = [2, 2];
    trackingCircle.position = nextPoint;
    trackingCircle.selected = false;
    destroyStack.push(() => trackingCircle.remove());
  };

  callback.complete = (currentPoint, group) => {
    const finalCircle = circle.clone();
    finalCircle.visible = true;
    finalCircle.position = currentPoint;
    finalCircle.strokeWidth = 2;
    finalCircle.selected = false;
    group.addChild(finalCircle);
    circle.remove();
  };
};

const fill = (callback, point, circle) => {
  circle.selected = true;
  callback.next = null;
  callback.complete = (color) => {
    circle.selected = false;
    circle.fillColor = color;
  };
  callback.ignored = () => {
    circle.selected = false;
  };
};

const remove = (callback, point, circle) => {
  circle.selected = true;
  callback.next = null;
  callback.complete = () => {
    circle.remove();
  };
  callback.ignored = () => {
    circle.selected = false;
  };
};

export default { draw, move, fill, remove };
