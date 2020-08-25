import React from 'react';

const BlackPenSvg = ({ strokeColor }: { strokeColor: string }) => {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
      <title>black pen</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="App-icons" transform="translate(-77.000000, -250.000000)">
          <g id="black-pen" transform="translate(78.000000, 251.000000)">
            <rect
              id="Rectangle-Copy-5"
              stroke={strokeColor}
              fill="#2A303E"
              x="0"
              y="0"
              width="24"
              height="24"
              rx="4"
            />
            <g id="Group-7" transform="translate(4.000000, 4.000000)">
              <rect id="Rectangle" x="0" y="0" width="16" height="16" />
            </g>
            <path
              d="M13.6227514,6.6191749 C14.001101,6.27760491 14.5889074,6.28850562 14.9536413,6.64385588 L14.9536413,6.64385588 L17.7189129,9.33798464 C18.101196,9.71043272 18.092412,10.3168762 17.6994937,10.6786662 L17.6994937,10.6786662 L10.4383706,17.3645381 C10.2601986,17.5285947 10.0243401,17.62 9.77918695,17.62 L9.77918695,17.62 L6.95968935,17.62 C6.42966756,17.62 6,17.2013866 6,16.6850008 L6,16.6850008 L6,13.9092187 C6,13.648885 6.11140413,13.4003385 6.30740233,13.2233934 L6.30740233,13.2233934 L12.062,8.027 L12.3803834,7.73927292 L12.381,7.74 L12.062,8.027 L11.2530441,8.76134598 L15.2250938,12.953786 L16.3770676,11.8900462 L12.381,7.74 Z"
              id="Combined-Shape"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default BlackPenSvg;
