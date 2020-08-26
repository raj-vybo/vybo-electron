import React from 'react';
import VyboLogoGif from './VyboLogoGif.gif';

const VyboLogoWaitingScreen = () => {
  console.log('Hello Iam From The Loader Bro');
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 flex-column"
      style={{ backgroundColor: '#181D26' }}
    >
      <img src={VyboLogoGif} alt="" />
    </div>
  );
};

export default VyboLogoWaitingScreen;
