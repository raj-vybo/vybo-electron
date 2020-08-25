import { Observable } from 'rxjs/internal/Observable';

const handlePointerOnVideo = (points: Observable<DataFromVision | null>) => {
  const penPointerOnVideo = document.getElementById(
    'mousepoint'
  ) as HTMLElement;

  points.subscribe((point: any) => {
    setElementColor(penPointerOnVideo, point.flag ? 'green' : 'red');
    setElementPosition(
      penPointerOnVideo,
      point.x * (640 / (window.innerHeight * 0.7 * (640 / 480))) * 0.5,
      point.y * (480 / (window.innerHeight * 0.7)) * 0.5
    );
  });

  function setElementColor(element: HTMLElement, color: string) {
    element.style.backgroundColor = color;
  }

  function setElementPosition(element: HTMLElement, left: number, top: number) {
    element.style.left = `${left + 5}px`;
    element.style.top = `${top - 10}px`;
  }
};

export default handlePointerOnVideo;
