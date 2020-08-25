import { Path } from 'paper';

const draw = (callback, point, _, destroyStack) => {
  const start = { ...point };
  callback.next = (nextPoint) => {
    const trackingLine = new Path.Line({
      from: start,
      to: nextPoint,
      dashArray: [2, 2],
      strokeColor: 'red'
    });
    destroyStack.push(() => trackingLine.remove());
  };
  callback.complete = (currentPoint, group) => {
    const finalLine = new Path.Line({
      from: start,
      to: currentPoint,
      strokeColor: 'black',
      strokeWidth: 2,
      data: { type: 'line' }
    });
    group.addChild(finalLine);
  };
};

const move = (callback, point, line, destroyStack) => {
  line.selected = true;
  callback.next = (nextPoint) => {
    line.visible = false;
    const trackingLine = line.clone();
    trackingLine.visible = true;
    trackingLine.strokeColor = 'red';
    trackingLine.dashArray = [2, 2];
    trackingLine.position = nextPoint;
    trackingLine.selected = false;
    destroyStack.push(() => trackingLine.remove());
  };

  callback.complete = (currentPoint, group) => {
    const finalLine = line.clone();
    finalLine.visible = true;
    finalLine.position = currentPoint;
    finalLine.strokeWidth = 2;
    finalLine.selected = false;
    group.addChild(finalLine);
    line.remove();
  };
};

const fill = (callback, point, line) => {
  line.selected = true;
  callback.next = null;
  callback.complete = (color) => {
    line.selected = false;
    line.strokeColor = color;
  };
  callback.ignored = () => {
    line.selected = false;
  };
};

const remove = (callback, point, line) => {
  line.selected = true;
  callback.next = null;
  callback.complete = () => {
    line.remove();
  };
  callback.ignored = () => {
    line.selected = false;
  };
};

export default { draw, move, fill, remove };
