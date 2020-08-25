function randBtw(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomAffirmatives() {
  const arr = ['to this point', 'yes', 'to here', 'yep', 'affirmative', 'stop', 'yeah', 'right', 'good'];
  let n = randBtw(2, 4);
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function randShape() {
  return ['circle', 'arrow', 'rectangle', 'line'].sort(() => 0.5 - Math.random())[0];
}

function randAction() {
  return ['Move', 'Fill', 'Remove'].sort(() => 0.5 - Math.random())[0];
}
function randColor() {
  return ['red', 'blue', 'green', 'yellow', 'black', 'purple', 'skyblue', 'violet', 'cyan'].sort(() => 0.5 - Math.random())[0];
}

function distance(point1, point2) {
  return (point1.x - point2.x) ** 2 - (point1.y - point2.y) ** 2;
}

function shortestPathDistance(path, point) {
  return distance(path.getNearestPoint(point), point);
}

function getSuggessionsForShapeInitiation(action) {
  if (!['FILL', 'REMOVE'].includes(action.toUpperCase())) {
    return `-> : "${getRandomAffirmatives().join('" or "')}" etc..,`;
  } else if ('FILL' === action.toUpperCase()) {
    return `-> : "${randColor()} Color" or "With ${randColor()} color"`;
  } else {
    return `-> : "Yes" or "Yes remove" etc..,`;
  }
}
function getRandomAnnotaionInitiation() {
  return capitalize(
    ['annotate as', 'write text', 'annotate with', 'This is', 'this is an', 'this is a', 'label this as'].sort(
      () => 0.5 - Math.random()
    )[0]
  );
}

function getRandomAction() {
  return Math.random() > 0.5 ? `${getRandomAnnotaionInitiation()} ${randShape()}` : `${randAction()} this ${randShape()}`;
}

export default {
  capitalize,
  getRandomAffirmatives,
  randShape,
  randAction,
  randColor,
  shortestPathDistance,
  getSuggessionsForShapeInitiation,
  getRandomAnnotaionInitiation,
  getRandomAction
};
