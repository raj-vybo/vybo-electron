import AudioCanvasUtil from '..';
import { PointText, Group } from 'paper';
import { Subject } from 'rxjs';
import ActionInfo from './action.info';
import Util from './action.util';
import ActionDefinitions from '../action/action.definitions';

const ExcectionInfo = new Subject();
let LastAction = null;
let currentPenPosition;
const ActionExecutor = (AudioDrawingGroup, excection) => ({
  destroyOnChangeStack: [],
  clearAudioDrawingGroup() {
    AudioDrawingGroup.remove();
    AudioDrawingGroup = new Group();
  },
  updatePenPosition(position) {
    currentPenPosition = position;
    while (this.destroyOnChangeStack.length) {
      const destroyOnChangeFunc = this.destroyOnChangeStack.pop();
      try {
        destroyOnChangeFunc();
      } catch (e) {
        console.log(e);
      }
    }
  },
  completeFillColor(color) {
    if (this.preparedForCompletion('CompleteFillColor')) {
      excection.complete(color);
      excection.complete = null;
      excection.next = null;
    }
  },
  completeRemove() {
    if (this.preparedForCompletion('CompleteRemove')) {
      excection.complete();
      excection.complete = null;
      excection.next = null;
    }
  },
  initiateShapeAction(action, shape) {
    this.completeIgnored();
    let item = null;
    // Other than draw all other shape actions need a shape thats already drawn on canvas
    if (action.toLowerCase() !== 'draw') {
      const result = AudioDrawingGroup.children.filter((child) => child.data.type === shape.toLowerCase());
      if (!result.length) {
        ExcectionInfo.next({ ...ActionInfo.InitiateShapeAction(shape, action), cannotFind: true, success: false });
        return;
      }
      item = result
        .map((matchedShape) => ({
          shape: matchedShape,
          distance: Util.shortestPathDistance(matchedShape, currentPenPosition)
        }))
        .sort((x, y) => y.distance - x.distance)[0].shape;
    }

    try {
      AudioCanvasUtil.perform(action.toLowerCase())(shape.toLowerCase())(
        excection,
        currentPenPosition,
        item,
        this.destroyOnChangeStack
      );
      ExcectionInfo.next({ ...ActionInfo.InitiateShapeAction(shape, action), success: true });
      LastAction = `InitiateShapeAction_${action.toUpperCase()}`;
    } catch (e) {
      console.log('Error Occurred In Resolving Command', action, shape);
      ExcectionInfo.next({ ...ActionInfo.InitiateShapeAction(shape, action), success: false, weired: true });
    }
  },
  completeShapeAction() {
    if (this.preparedForCompletion('CompleteShapeAction')) {
      excection.complete(currentPenPosition, AudioDrawingGroup);
      excection.next = null;
      excection.complete = null;
    }
  },
  writeTextToCanvas(inputTxt) {
    this.completeIgnored();
    const textAnnotation = new PointText({
      point: currentPenPosition,
      content: inputTxt,
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 20,
      justification: 'center'
    });
    AudioDrawingGroup.addChild(textAnnotation);
    ExcectionInfo.next({ ...ActionInfo.WriteTextToCanvas(inputTxt), success: true });
    LastAction = 'WriteTextToCanvas';
  },
  completeIgnored() {
    if (excection.ignored) {
      excection.ignored();
      excection.ignored = null;
    }
  },
  preparedForCompletion(action) {
    // Validation And Error Handling
    if (!excection.complete) {
      ExcectionInfo.next({ ...ActionInfo[action], success: false });
      return false;
    }
    if (!ActionInfo[action].canFollow(LastAction)) {
      ExcectionInfo.next({ ...ActionInfo[action], badFollowUp: true, success: false });
      return false;
    }

    // Finish Any Ignored actions
    this.completeIgnored();

    // Success
    ExcectionInfo.next({ ...ActionInfo[action], complete: true, success: true });
    LastAction = action;

    return true;
  },
  startAudioMode() {
    const annyang = window.annyang;
    if (annyang) {
      const commands = {
        [ActionDefinitions.InitiateShapeAction.match]: {
          regexp: ActionDefinitions.InitiateShapeAction.regexp,
          callback: (action, _, shape) => this.initiateShapeAction(action, shape)
        },
        [ActionDefinitions.FinishShapeAction.match]: {
          regexp: ActionDefinitions.FinishShapeAction.regexp,
          callback: () => this.completeShapeAction()
        },
        [ActionDefinitions.FillConfirmAction.match]: (color) => this.completeFillColor(color),
        [ActionDefinitions.RemoveConfirmAction.match]: () => this.completeRemove(),
        [ActionDefinitions.TextInputAction.match]: {
          regexp: ActionDefinitions.TextInputAction.regexp,
          callback: (_, inputTxt) => this.writeTextToCanvas(inputTxt)
        }
      };
      // Add our commands to annyang
      annyang.addCommands(commands);
      //   annyang.addCallback('resultMatch' /* , mouseSuccess */);
      //   annyang.addCallback('resultNoMatch' /* , mouseFail */);

      return { start: annyang.start, pause: annyang.pause, resume: annyang.resume };
    }
    // If No annyang
    return { pause: void 0, resume: void 0 };
  }
});

export { ActionExecutor, ExcectionInfo };
