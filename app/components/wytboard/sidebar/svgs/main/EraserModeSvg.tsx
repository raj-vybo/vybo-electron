import React from 'react';

const EraserModeSvg = ({ fillColor }: { fillColor: string }) => {
  return (
    <svg width="36px" height="56px" viewBox="0 0 36 56" version="1.1">
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="App-icons" transform="translate(-24.000000, -205.000000)">
          <g id="eraser" transform="translate(24.000000, 205.000000)">
            <rect
              id="Rectangle-Copy-7"
              fill={fillColor}
              x="0"
              y="0"
              width="36"
              height="56"
              rx="18"
            />
            <g id="Group-4" transform="translate(10.000000, 20.000000)">
              <rect id="Rectangle" x="0" y="0" width="16" height="16" />
              <path
                d="M10.7968338,1.39797292 L15.2993265,5.85278697 C15.687923,6.23726845 15.6957641,6.8625419 15.3169314,7.25664721 L8,14.8685596 L3.41099514,14.8685596 C2.98548488,14.8685596 2.57999707,14.6878401 2.29551551,14.3714081 L0.491352669,12.3646176 C-0.0405226885,11.7730067 -0.0180165309,10.8690611 0.542641062,10.3046518 L9.38404003,1.4040886 C9.77271282,1.01281492 10.4047882,1.0100788 10.7968338,1.39797292 Z M14.8800731,12.8680102 C15.4323578,12.8680102 15.8800731,13.3157255 15.8800731,13.8680102 C15.8800731,14.3808461 15.4940329,14.8035174 14.9966942,14.8612825 L14.8800731,14.8680102 L9.42715161,14.8680102 L11.5198958,12.8680102 L14.8800731,12.8680102 Z"
                id="Combined-Shape"
                fill="#FFFFFF"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default EraserModeSvg;
