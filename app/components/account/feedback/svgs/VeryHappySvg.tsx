import React from 'react';

const VeryHappySvg = ({
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
      <title>katal khush</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="katal-khush" fillRule="nonzero">
          <circle
            id="Oval"
            fill={active ? '#FFD93B' : '#E9E9E9'}
            cx="28"
            cy="28"
            r="28"
          />
          <path
            d="M44.59,38.59275 C41.90725,45.12375 35.4935,49.714 28.00175,49.714 C20.51,49.714 14.09625,45.12375 11.396,38.59275 C11.14225,37.9855 11.564,37.27675 12.222,37.142 C22.736,35.18375 33.26575,35.18375 43.76225,37.142 C44.42025,37.27675 44.842,37.9855 44.59,38.59275 Z"
            id="Path"
            fill="#3E4347"
          />
          <path
            d="M56,28 C56,43.47 43.46125,56 28,56 C19.1975,56 11.34,51.94 6.20375,45.57875 C11.0075,49.46375 17.12375,51.7825 23.7825,51.7825 C39.24375,51.7825 51.7825,39.2525 51.7825,23.7825 C51.7825,17.12375 49.46375,11.0075 45.57875,6.20375 C51.93125,11.34 56,19.1975 56,28 Z"
            id="Path"
            fill={active ? '#F4C534' : '#BABABA'}
          />
          <g
            id="Group"
            transform="translate(12.578125, 13.562500)"
            fill="#FFFFFF"
          >
            <path
              d="M0.028875,23.5165 C2.020375,26.7575 8.252125,27.10575 15.687875,27.10575 C23.025625,27.10575 29.271375,26.7575 31.346875,23.65125 C31.290875,23.63025 31.245375,23.59175 31.185875,23.5795 C20.815375,21.644 10.415125,21.63 0.028875,23.5165 Z"
              id="Path"
            />
            <ellipse
              id="Oval"
              cx="26.406625"
              cy="8.88825"
              rx="8.8655"
              ry="8.86025"
            />
          </g>
          <ellipse
            id="Oval"
            fill="#3E4347"
            cx="38.98125"
            cy="22.45075"
            rx="4.8335"
            ry="4.837"
          />
          <g
            id="Group"
            transform="translate(8.093750, 13.562500)"
            fill="#FFFFFF"
          >
            <ellipse
              id="Oval"
              transform="translate(32.957448, 7.006640) rotate(-134.995949) translate(-32.957448, -7.006640) "
              cx="32.9574482"
              cy="7.00663972"
              rx="1.30743928"
              ry="1"
            />
            <ellipse
              id="Oval"
              cx="8.92675"
              cy="8.88825"
              rx="8.8655"
              ry="8.86025"
            />
          </g>
          <ellipse
            id="Oval"
            fill="#3E4347"
            cx="17.017"
            cy="22.45075"
            rx="4.8335"
            ry="4.837"
          />
          <ellipse
            id="Oval"
            fill="#FFFFFF"
            transform="translate(19.087774, 20.566245) rotate(-134.995949) translate(-19.087774, -20.566245) "
            cx="19.0877738"
            cy="20.5662447"
            rx="1.30743928"
            ry="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default VeryHappySvg;
