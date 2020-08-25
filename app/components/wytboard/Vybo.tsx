import React, { useEffect } from 'react';
import VyboHeader from 'components/wytboard/header/VyboHeader';
import VyboSidebar from 'components/wytboard/sidebar/VyboSideBar';
import CanvasWrapper from 'components/wytboard/canvas/CanvasWrapper';
import images from 'resources/images/backgrounds';
import MainConfig from 'config/main.config';
import { startWith, filter } from 'rxjs/operators';
import VyboWalkthrough from 'components/wytboard/guides/VyboWalkThrough';

const VYBO_MAIN_CONTAINER_STYLES: React.CSSProperties = {
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '76px auto',
  gridTemplateAreas: '"header" "content"',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  MozBackgroundSize: '102vw',
  WebkitBackgroundSize: '102vw',
  backgroundRepeat: 'no-repeat',
};

const VYBO_CONTENT_CONTAINER_STYLES: React.CSSProperties = {
  gridArea: 'content',
  display: 'grid',
  gridTemplateColumns: '132px auto',
  gridTemplateAreas: '"sidebar canvasArea"',
};

const VYBO_CANVAS_AREA_STYLES: React.CSSProperties = {
  gridArea: 'canvasArea',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  marginTop: '70px',
};

const Vybo = () => {
  const mainContainerRef = React.useRef<HTMLElement>();

  useEffect(() => {
    const modeChangeSubscription = MainConfig.changes
      .pipe(
        startWith({ change: 'backgroundImage', value: 1 }),
        filter(({ change }) => change === 'backgroundImage')
      )
      .subscribe(({ value }) => {
        if (mainContainerRef.current !== undefined) {
          console.log(value);
          const image = images[`image${value}`];
          mainContainerRef.current.style.backgroundImage = `url(${image})`;
        }
      });
    return () => {
      modeChangeSubscription.unsubscribe();
    };
  }, []);

  return (
    <main style={VYBO_MAIN_CONTAINER_STYLES} ref={mainContainerRef}>
      <VyboHeader />
      <div style={VYBO_CONTENT_CONTAINER_STYLES}>
        <VyboSidebar />
        <main style={VYBO_CANVAS_AREA_STYLES}>
          <CanvasWrapper />
        </main>
      </div>
      <VyboWalkthrough />
      {/* <VyboTutorial
        showTutorial
        finishTutorial={() => setShowTutorial(false)}
      /> */}
    </main>
  );
};

export default Vybo;
