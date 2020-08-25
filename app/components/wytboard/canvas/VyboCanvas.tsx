import React, { useEffect, useRef } from 'react';

import paper, { Group } from 'paper';
import SketchGroup from 'overrides/SketchGroup';

import VisionService from 'services/vision/VisionService';
import DataSharingService from 'services/data-sharing';

import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import startWritingText from 'text/index';
import MainConfig from 'config/main.config';
import Modes from 'constants/canvas.modes';
import pairWisePoints from './points/pairWisePoints';

import handlePenMode from './modes/pen.mode';
import handleEraserMode from './modes/eraser.mode';
import handlePointerMode from './modes/pointer.mode';
import handleImageUploads from './modes/image.upload';

import handlePointerOnCanvasWithTextMode from './pointers/pointerOnCanvas';
import handlePointerOnVideo from './pointers/pointerOnVideo';

const VyboCanvas = () => {
  const imageTagRef = useRef<HTMLImageElement>(); // Dummy image element for canvas image uploads to work

  const pairPoints: Observable<PairWiseDataPoints> = pairWisePoints(); // Paiwise streamed data from backend

  const points = pairPoints.pipe(map((x) => x.currentPoint));

  useEffect(() => {
    // Setting up canvas
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
    if (canvas === null) return;
    canvas.width = window.innerHeight * 0.7 * (640 / 480);
    canvas.height = window.innerHeight * 0.7;

    // Linking paper to our canvas element
    paper.setup(canvas);
    paper.settings.applyMatrix = true;

    // Defining various groups (~layers) used on our canvas (TODO: Try to make mouse and pointer groups to only one Group)
    const rasterGroup = new Group(); // For images uploaded to the canvas
    const sketchGroup = new SketchGroup(); // For all the drawings
    const mouseGroup = new Group(); // For mouse pointer on the canvas when not in pointer mode

    // For shape correction and handwriting mode we store the history in these
    const allStrokesAsPaths: paper.Path[] = [];
    const allStrokesAsCoardinates: any[] = [];

    // -------------------------- Canvas functionalities Start Here ----------------------------
    // Pen Mode
    handlePenMode(
      points,
      sketchGroup,
      allStrokesAsPaths,
      allStrokesAsCoardinates
    );

    // Pointer Mode
    handlePointerMode(points, sketchGroup);

    // Eraser Mode
    handleEraserMode(pairPoints, sketchGroup, rasterGroup);

    // Mouse Pointer On Canvas Along with Text mode as text mode has lot to do with pointer on canvas
    const unsubFunc = handlePointerOnCanvasWithTextMode(
      points,
      mouseGroup,
      sketchGroup
    );

    // Pen Position On Video Box
    handlePointerOnVideo(points);

    // Upload Images to Canvas
    const imageSelectionSubscription = handleImageUploads(
      rasterGroup,
      setErasedPathsColor(sketchGroup),
      imageTagRef.current
    );

    // Undoing Canvas Drawings
    DataSharingService.undoCanvas.subscribe(() => sketchGroup.undo());

    // Clearing Canvas
    DataSharingService.clearCanvas.subscribe(() => {
      sketchGroup.removeChildren();
      sketchGroup.data.children = [];

      // Clearing the maitained strokes and paths for shape correction
      allStrokesAsCoardinates.length = 0;
      allStrokesAsPaths.length = 0;

      // Make sure that next point is a pendown points (Helps with eraser/pen mode to restart)
      VisionService.pointsStream.next({
        x: 0,
        y: 0,
        flag: false,
      } as DataFromVision);
    });

    // Changin The color of the canvas
    let previousColorScreen: paper.Path.Rectangle | null = null;
    const canvasColorSub = MainConfig.changes
      .pipe(filter(({ change }) => change === 'canvasColor'))
      .subscribe(({ value }) => {
        if (previousColorScreen !== null) {
          previousColorScreen.remove();
        }

        const rect = new paper.Path.Rectangle({
          point: [0, 0],
          size: [paper.view.size.width, paper.view.size.height],
          strokeColor: '#fffff',
        });

        const selectedCanvasColor = new paper.Color(String(value));

        setErasedPathsColor(sketchGroup)(
          rasterGroup.children.length
            ? new paper.Color('#FFFFFF')
            : selectedCanvasColor
        );

        rect.sendToBack();
        rect.fillColor = selectedCanvasColor;

        previousColorScreen = rect;
      });

    // Clean up the subscriptions
    return () => {
      // ::TODO make a points unsubscription here some way (To prevent data leaks)
      imageSelectionSubscription.unsubscribe();
      canvasColorSub.unsubscribe();
      unsubFunc();
    };
  }, []);

  return (
    <>
      <div className="position-relative">
        <textarea
          className="text-box"
          maxLength={50}
          style={{ position: 'absolute', color: 'black', display: 'none' }}
        />
        <canvas
          hidden={false}
          id="mainCanvas"
          width={window.innerHeight * 0.7 * (640 / 480)}
          height={window.innerHeight * 0.7}
        />
      </div>
      <img
        alt="ImageToBeShownOnCanvas"
        hidden
        ref={imageTagRef} // TODO:: Resolve this refs issue in typescript
        id="ImageToBeShownOnCanvas"
      />
    </>
  );
};

export default VyboCanvas;

function setErasedPathsColor(sketchGroup: SketchGroup) {
  return function toThisColor(color: paper.Color) {
    sketchGroup.children
      .filter(
        (path) =>
          path.data.type === 'ErasedCircle' && path instanceof paper.Path
      )
      .forEach((child) => ((child as paper.Path).strokeColor = color));
  };
}
