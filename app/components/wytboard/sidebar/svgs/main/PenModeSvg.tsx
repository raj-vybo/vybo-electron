import React from 'react';

const PenModeSvg = ({ fillColor }: { fillColor: string }) => {
  return (
    <svg width="36px" height="56px" viewBox="0 0 36 56" version="1.1">
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="App-icons" transform="translate(-24.000000, -77.000000)">
          <g id="pencil" transform="translate(24.000000, 77.000000)">
            <rect
              id="Rectangle-Copy"
              fill={fillColor}
              x="0"
              y="0"
              width="36"
              height="56"
              rx="18"
            />
            <g id="Group-2" transform="translate(10.000000, 20.000000)">
              <rect id="Rectangle" x="0" y="0" width="16" height="16" />
              <path
                d="M8.6439307,3.32580962 C8.85160856,3.11813175 9.18857916,3.11897217 9.39521853,3.32768336 L9.39521853,3.32768336 L12.5660609,6.53031743 C12.7712477,6.73756151 12.7704145,7.07164909 12.5641965,7.2778671 L12.5641965,7.2778671 L4.091321,15.7507426 C3.99194128,15.8501223 3.85715345,15.9059533 3.7166093,15.9059533 L3.7166093,15.9059533 L0.529922374,15.9059533 C0.237254328,15.9059533 -3.01980663e-14,15.6686989 -3.01980663e-14,15.3760309 L-3.01980663e-14,15.3760309 L-3.01980663e-14,12.1892414 C-3.01980663e-14,12.0486972 0.055830947,11.9139094 0.15521067,11.8145296 L0.15521067,11.8145296 Z M12.0339766,0.218490065 C12.2434957,0.0272901886 12.5664191,0.0349742057 12.7666069,0.235923127 L12.7666069,0.235923127 L15.8454995,3.32652124 C16.0496983,3.53149635 16.0517434,3.86236862 15.8500939,4.0698522 L15.8500939,4.0698522 L14.1662237,5.80244015 C13.9594663,6.01517944 13.6183519,6.01676063 13.4096312,5.80594723 L13.4096312,5.80594723 L10.2387888,2.60331315 C10.0269254,2.38932553 10.0357265,2.04202403 10.2581566,1.83904205 L10.2581566,1.83904205 Z"
                id="Combined-Shape"
                fill="#FFFFFF"
                fillRule="nonzero"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default PenModeSvg;
