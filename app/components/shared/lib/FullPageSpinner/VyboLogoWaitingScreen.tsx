import React, { useRef, useEffect } from 'react';
import VyboBannerVideo from './VyboBannerVid.mp4';
// import VyboLogoGif from './VyboLogoGif.gif';

const VyboLogoWaitingScreen = () => {
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (vidRef && vidRef.current) {
      vidRef.current.play();
    }
  }, []);
  console.log('Hello Iam From The Loader Bro');
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 flex-column"
      style={{ backgroundColor: '#1C212E' }}
    >
      <video ref={vidRef} src={VyboBannerVideo}>
        {/* <source src={} type="video/mp4" /> */}
      </video>
      {/* <img src={VyboLogoGif} alt="" /> */}
    </div>
  );
};

export default VyboLogoWaitingScreen;
