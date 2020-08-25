import paper, { view } from 'paper';
import penConfig from 'config/pen.config';
import SketchGroup from 'overrides/SketchGroup';
import MainConfig from 'config/main.config';
import Modes from 'constants/canvas.modes';
/**
 * Add an textarea, this is to be used as 'the editor'
 * We will place it over some pointText that we want to edit
 * */
const $documentBody: HTMLBodyElement = document.getElementsByTagName('body')[0];
let activeBox: paper.TextItem | null;

let editor: HTMLTextAreaElement | null = null;

function refetchEditor() {
  if (!$documentBody || !editor) {
    const $body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    editor = $body
      ? ($body.getElementsByClassName('text-box')[0] as HTMLTextAreaElement)
      : null;
  }
}

function setTextboxDisplay(prop: string): void {
  if (editor === null) {
    refetchEditor();
    return;
  }
  editor.style.display = prop;
}
/**
 * Show/hide 'the editor'
 * */
function showTextbox(showBox: boolean, point: paper.Point) {
  if (activeBox === null) return;

  if (editor === null) {
    refetchEditor();
    return;
  }

  refetchEditor();

  if (!showBox) {
    activeBox.content = editor.value;
    activeBox.visible = true;

    editor.textContent = null;
    setTextboxDisplay('none');
  } else {
    const pos = view.projectToView(point);

    editor.value = activeBox.content;
    activeBox.visible = false;

    setTextboxDisplay('block');

    editor.style.top = `${pos.y}px`;
    editor.style.left = `${pos.x}px`;

    editor.style.color = activeBox.fillColor?.toCSS(true) || '#000';

    editor.focus();
  }
}

/**
 * Set box active (true/false)
 * */
function setBoxActive(showBox: boolean) {
  paper.project.activeLayer.selected = false;

  if (!activeBox) return;

  showTextbox.call(null, showBox, activeBox.bounds.topLeft);
  view.update();
}

/**
 * Hit test
 * */
function textHitTest(point: paper.Point): paper.TextItem | null {
  const items = paper.project.getItems({
    class: paper.PointText,
  });

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.contains(point)) {
      return item as paper.TextItem;
    }
  }
  return null;
}

/**
 * On mouse down:
 *     - Select if some text is hit
 *     - Unselect any prev selected text if hitresult is null
 *     - else place a new text
 * */
function startWritingText(ev: paper.MouseEvent, group: SketchGroup): void {
  /*
   * If click hits some text box then mark it focused */
  if (editor === null) {
    refetchEditor();
  }

  const item = textHitTest(ev.point);
  if (item) {
    if (activeBox) setBoxActive(false);

    activeBox = item;
    setBoxActive(true);
    return;
  }

  /*
   * If some text box is focused then unfocus it */
  if (activeBox) {
    setBoxActive(false);
    activeBox = null;
    return;
  }

  /*
   * Otherwise create one and mark it focused */
  // create(ev.point, true);

  if (MainConfig.getCurrentMode() !== Modes.Text) {
    MainConfig.setMode(Modes.Text);
  }

  activeBox = new paper.PointText(ev.point);

  console.log('Adding Text Boax To SketchGroup');
  group.add(activeBox);

  activeBox.style = {
    fontSize: '25',
    fillColor: new paper.Color(penConfig.getStrokeColor()),
  } as paper.Style;

  setBoxActive(true);
}

export default startWritingText;
