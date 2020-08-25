import React from 'react';

const ThickStrokeSvg = ({ strokeColor }: { strokeColor: string }) => {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
      <title>thickest</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="App-icons" transform="translate(-77.000000, -192.000000)">
          <g id="thickest" transform="translate(78.000000, 193.000000)">
            <rect
              id="Rectangle-Copy-6"
              stroke={strokeColor}
              fill="#2A303E"
              x="0"
              y="0"
              width="24"
              height="24"
              rx="4"
            />
            <g id="Group-7-Copy-2" transform="translate(4.000000, 4.000000)">
              <rect id="Rectangle" x="0" y="0" width="16" height="16" />
              <path
                d="M16,8 C16,10.209139 14.209139,12 12,12 L4,12 C1.790861,12 2.705415e-16,10.209139 0,8 C-2.705415e-16,5.790861 1.790861,4 4,4 L12,4 C14.209139,4 16,5.790861 16,8 Z"
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

export default ThickStrokeSvg;
