import { Path } from 'paper';

const draw = (callback, point, _, destroyStack) => {
  const start = { ...point };
  callback.next = (nextPoint) => {
    const trackingRect = new Path.Rectangle({
      from: start,
      to: nextPoint,
      dashArray: [2, 2],
      strokeColor: 'red'
    });
    destroyStack.push(() => trackingRect.remove());
  };
  callback.complete = (currentPoint, group) => {
    const finalRect = new Path.Rectangle({
      from: start,
      to: currentPoint,
      strokeColor: 'black',
      strokeWidth: 2,
      data: { type: 'rectangle' }
    });
    group.addChild(finalRect);
  };
};

const move = (callback, point, rect, destroyStack) => {
  rect.selected = true;
  callback.next = (nextPoint) => {
    rect.visible = false;
    const trackingRect = rect.clone();
    trackingRect.visible = true;
    trackingRect.strokeColor = 'red';
    trackingRect.dashArray = [2, 2];
    trackingRect.position = nextPoint;
    trackingRect.selected = false;
    destroyStack.push(() => trackingRect.remove());
  };

  callback.complete = (currentPoint, group) => {
    const finalRect = rect.clone();
    finalRect.visible = true;
    finalRect.position = currentPoint;
    finalRect.strokeWidth = 2;
    finalRect.selected = false;
    group.addChild(finalRect);
    rect.remove();
  };
};

const fill = (callback, point, rect) => {
  rect.selected = true;
  callback.next = null;

  callback.complete = (color) => {
    rect.selected = false;
    rect.fillColor = color;
  };
  callback.ignored = () => {
    rect.selected = false;
  };
};

const remove = (callback, point, rect) => {
  rect.selected = true;
  callback.next = null;
  callback.complete = null;
  callback.complete = () => {
    rect.remove();
  };
  callback.ignored = () => {
    rect.selected = false;
  };
};

export default { draw, move, fill, remove };
