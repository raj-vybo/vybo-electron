import paper, { Point, view } from 'paper';

import MainConfig from 'config/main.config';
import penConfig from 'config/pen.config';
import Modes from 'constants/canvas.modes';

import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';

import PencilSvg from 'resources/svgs/canvas/PencilSvg.svg';
import EraserSvg from 'resources/svgs/canvas/EraserSvg.svg';
import PointerSvg from 'resources/svgs/canvas/PointerSvg.svg';
import TextSvg from 'resources/svgs/canvas/TextSvg.svg';
import SketchGroup from 'overrides/SketchGroup';
import startWritingText from 'text';

const handlePointerOnCanvasWithTextMode = (
  points: Observable<DataFromVision | null>,
  mouseGroup: paper.Group,
  sketchGroup: SketchGroup
) => {
  const canvasElement = document.getElementById(
    'mainCanvas'
  ) as HTMLCanvasElement;

  if (canvasElement) {
    canvasElement.style.cursor = 'pointer';
  }

  let activeTracker: null | paper.Item = null;

  /** Pencil Svg * */
  let pencilSvg: null | paper.Item = null;
  mouseGroup.importSVG(PencilSvg, (svg: paper.Group) => {
    svg.position = view.center;
    pencilSvg = svg;
    activeTracker = pencilSvg;
  });

  /** Pointer Svg * */
  let pointerSvg: null | paper.Item = null;
  mouseGroup.importSVG(PointerSvg, (svg: paper.Group) => {
    svg.position = view.center;
    pointerSvg = svg;
    pointerSvg.visible = false;
  });

  /** Eraser Svg * */
  let eraserSvg: null | paper.Item = null;
  mouseGroup.importSVG(EraserSvg, (svg: paper.Group) => {
    svg.position = view.center;
    eraserSvg = svg;
    eraserSvg.visible = false;
  });

  /** Text Svg * */
  let textSvg: null | paper.Item = null;
  mouseGroup.importSVG(TextSvg, (svg: paper.Group) => {
    svg.position = view.center;
    textSvg = svg;
    textSvg.visible = false;
  });

  const modeChangeSubscription = MainConfig.changes
    .pipe(filter(({ change }) => change === 'mode'))
    .subscribe(({ value }) => {
      switch (value) {
        case Modes.Pointer:
          setActiveTracker(pointerSvg);
          break;
        case Modes.Eraser:
          setActiveTracker(eraserSvg);
          break;
        case Modes.Text:
          setActiveTracker(textSvg);
          break;
        case Modes.Write:
        case Modes.Move:
        default:
          setActiveTracker(pencilSvg);
      }
    });

  const setActiveTracker = (svgIcon: null | paper.Item) => {
    let position: paper.Point | null = null;
    if (activeTracker) {
      position = activeTracker.position;
      activeTracker.visible = false;
    }

    activeTracker = svgIcon;
    if (activeTracker) {
      if (position) {
        activeTracker.position = position;
      }
      activeTracker.visible = true;
    }

    if (canvasElement) {
      if (MainConfig.getCurrentMode() === Modes.Text) {
        canvasElement.style.cursor = 'none';
      } else {
        canvasElement.style.cursor = 'pointer';
      }
    }
  };

  const penConfigSubscription = penConfig.changes.subscribe((change) => {
    if ('strokeColor' in change) {
      if (pencilSvg) {
        pencilSvg.children['Login-Signup-Flow'].children[
          'App-icons'
        ].children.pencil_w.children.Group.children[
          'Combined-Shape'
        ].fillColor = change.strokeColor;
      }
    }
  });

  const mousePath = new paper.Path.Circle(new Point(0, 0), 3);
  mouseGroup.addChild(mousePath);
  mousePath.strokeWidth = 6;
  mousePath.opacity = 0.5;

  const pointsStreamSub = points.subscribe((point: any) => {
    if (activeTracker && MainConfig.getCurrentMode() !== Modes.Text) {
      activeTracker.position = new paper.Point(point);
    }
  });

  // Text Mode Handling
  paper.view.onMouseMove = function textModeHandling(ev: paper.MouseEvent) {
    if (MainConfig.getCurrentMode() === Modes.Text && activeTracker !== null) {
      activeTracker.position = ev.point;
    }
  };

  // Write text directly to canvas
  paper.view.onMouseDown = function startTyping(ev: paper.MouseEvent) {
    startWritingText(ev, sketchGroup);
    if (activeTracker && MainConfig.getCurrentMode() === Modes.Text) {
      activeTracker.position = ev.point;
    }
  };

  return () => {
    modeChangeSubscription.unsubscribe();
    penConfigSubscription.unsubscribe();
    pointsStreamSub.unsubscribe();
  };
};

export default handlePointerOnCanvasWithTextMode;
