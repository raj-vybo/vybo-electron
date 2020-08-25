import React from 'react';

const OkayishSvg = ({
  active,
  ...rest
}: { active: boolean } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="57px"
      height="57px"
      viewBox="0 0 57 57"
      version="1.1"
      {...rest}
      style={{ cursor: 'pointer' }}
    >
      <title>medium</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="medium" fillRule="nonzero">
          <circle
            id="Oval"
            fill={active ? '#FFD93B' : '#E9E9E9'}
            cx="28"
            cy="28"
            r="28"
          />
          <path
            d="M56,28 C56,43.47 43.46125,56 28,56 C19.1975,56 11.34,51.94 6.20375,45.57875 C11.0075,49.46375 17.12375,51.7825 23.7825,51.7825 C39.24375,51.7825 51.7825,39.2525 51.7825,23.7825 C51.7825,17.12375 49.46375,11.0075 45.57875,6.20375 C51.93125,11.34 56,19.1975 56,28 Z"
            id="Path"
            fill={active ? '#F4C534' : '#BABABA'}
          />
          <g
            id="Group"
            transform="translate(14.875000, 18.375000)"
            fill="#3E4347"
          >
            <path
              d="M25.655,19.29375 C25.655,20.1355 24.97425,20.81625 24.1325,20.81625 L2.11575,20.81625 C1.28275,20.81625 0.59325,20.1355 0.59325,19.29375 C0.59325,18.452 1.28275,17.77125 2.11575,17.77125 L24.1325,17.77125 C24.976,17.773 25.655,18.452 25.655,19.29375 Z"
              id="Path"
            />
            <circle id="Oval" cx="4.21225" cy="4.27525" r="4.172" />
          </g>
          <ellipse
            id="Oval"
            fill="#5A5F63"
            transform="translate(20.854443, 20.945927) rotate(-126.653329) translate(-20.854443, -20.945927) "
            cx="20.8544429"
            cy="20.9459272"
            rx="1.09555165"
            ry="1"
          />
          <circle
            id="Oval"
            fill="#3E4347"
            cx="36.9075"
            cy="22.65025"
            r="4.172"
          />
          <ellipse
            id="Oval"
            fill="#5A5F63"
            transform="translate(38.673614, 20.950400) rotate(-126.656750) translate(-38.673614, -20.950400) "
            cx="38.6736143"
            cy="20.9503995"
            rx="1.09546376"
            ry="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default OkayishSvg;
