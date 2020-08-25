import React from 'react';

const HappySvg = ({
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
      <title>happy</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="happy" fillRule="nonzero">
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
          <circle
            id="Oval"
            fill="#3E4347"
            cx="38.3005"
            cy="24.675"
            r="4.39425"
          />
          <ellipse
            id="Oval"
            fill="#5A5F63"
            transform="translate(39.546970, 22.728033) rotate(-156.082889) translate(-39.546970, -22.728033) "
            cx="39.54697"
            cy="22.7280329"
            rx="1.3299521"
            ry="1"
          />
          <circle
            id="Oval"
            fill="#3E4347"
            cx="17.6995"
            cy="24.675"
            r="4.39425"
          />
          <ellipse
            id="Oval"
            fill="#5A5F63"
            transform="translate(18.944672, 22.727319) rotate(-156.082889) translate(-18.944672, -22.727319) "
            cx="18.9446719"
            cy="22.7273193"
            rx="1.3299521"
            ry="1"
          />
          <path
            d="M16.5305,39.053 C16.002,38.556 15.9775,37.72475 16.4745,37.198 C16.9715,36.67125 17.801,36.645 18.3295,37.142 C23.75275,42.24675 32.24725,42.24675 37.6705,37.142 C38.199,36.645 39.0285,36.67125 39.5255,37.198 C40.0225,37.7265 39.998,38.556 39.4695,39.053 C33.03825,45.108 22.96175,45.108 16.5305,39.053 Z"
            id="Path"
            fill="#3E4347"
          />
        </g>
      </g>
    </svg>
  );
};

export default HappySvg;
