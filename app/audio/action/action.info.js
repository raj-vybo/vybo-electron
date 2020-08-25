import Util from './action.util';
const ActionInfo = {
  CompleteFillColor: {
    command: 'Complete filling a shape with given color',
    errorMsg: () => `No shape active to fill.Initiate fill on a shape like "Fill this ${Util.randShape()}".`,
    canFollow: (lastCommand) => lastCommand === 'InitiateShapeAction_FILL'
  },
  CompleteRemove: {
    command: 'Complete Removing a shape',
    errorMsg: () => `No shape active to remove.Initiate remove on a shape like "Remove this ${Util.randShape()}".`,
    canFollow: (lastCommand) => lastCommand === 'InitiateShapeAction_REMOVE'
  },
  InitiateShapeAction(shape, action) {
    return {
      command: `${Util.capitalize(action)} ${shape}`,
      errorMsg: () => `Cannot find any ${shape} to ${action}`,
      sugesstions: () => Util.getSuggessionsForShapeInitiation(action)
    };
  },
  CompleteShapeAction: {
    command: 'Complete current shape action',
    errorMsg: () =>
      `No shape active.\nEither initiate a shape like "Draw a ${Util.randShape()}" \nor Select an existing shape with "${Util.randAction()} this ${Util.randShape()}".\nTo annotate any existing shape -> "${Util.getRandomAnnotaionInitiation()} ${Util.randShape()}" etc..,`,
    canFollow: (lastCommand) => lastCommand.includes('InitiateShapeAction') && !lastCommand.includes('FILL')
  },
  WriteTextToCanvas(text) {
    return {
      command: `Write "${text}"`,
      errorMsg: () => 'Something went wrong while writing to the canvas'
    };
  }
};

export default ActionInfo;
