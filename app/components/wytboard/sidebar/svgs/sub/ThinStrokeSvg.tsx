import React from 'react';

const ThinStrokeSvg = ({ strokeColor }: { strokeColor: string }) => {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
      <title>thinnest</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="App-icons" transform="translate(-77.000000, -112.000000)">
          <g id="thinnest" transform="translate(78.000000, 113.000000)">
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
              <path
                d="M16,8 C16,8.55228475 15.5522847,9 15,9 L1,9 C0.44771525,9 6.76353751e-17,8.55228475 0,8 C-6.76353751e-17,7.44771525 0.44771525,7 1,7 L15,7 C15.5522847,7 16,7.44771525 16,8 Z"
                id="Path-13"
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

export default ThinStrokeSvg;
