import paper, { view, Raster } from 'paper';
import DataSharingService from 'services/data-sharing';

const handleImageUploads = (
  rasterGroup: paper.Group,
  changeErasedPathColor: (color: paper.Color) => void,
  imageElement: HTMLImageElement | undefined
) => {
  let rasterOnCanvas: paper.Raster | null = null;

  const imageSelectionSubscription = DataSharingService.imageSelection.subscribe(
    (url: string) => {
      if (!url || imageElement === undefined) {
        return;
      }

      rasterGroup.removeChildren();
      imageElement.src = url;
      // Create a raster item using the image tag with id='mona'
      rasterOnCanvas = new Raster('ImageToBeShownOnCanvas');

      // Move the raster to the center of the view
      changeErasedPathColor(new paper.Color('#ffffff'));
      rasterOnCanvas.position = view.center;
      rasterGroup.addChild(rasterOnCanvas);

      rasterOnCanvas.on('load', function scaleImage() {
        console.log('SCALING', url);
        if (rasterOnCanvas === null) return;
        rasterOnCanvas.scale(
          view.viewSize.width / rasterOnCanvas.bounds.width,
          view.viewSize.height / rasterOnCanvas.bounds.height
        );
      });
    }
  );
  return imageSelectionSubscription;
};

export default handleImageUploads;
