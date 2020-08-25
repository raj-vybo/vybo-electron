import React from 'react';

const SettingsBackgroundSvg = ({
  active,
  ...rest
}: { active: boolean } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" {...rest}>
      <title>background</title>
      <g
        id="Login-Signup-Flow"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="background">
          <rect id="Rectangle" x="0" y="0" width="16" height="16" />
          <path
            d="M5.02325581,15.2616279 C4.71500386,15.2616279 4.46511628,15.0117403 4.46511628,14.7034884 C4.46511628,14.4294866 4.66255832,14.2016 4.92292953,14.1543412 L5.02325581,14.1453488 L7.441,14.145 L7.441,12.284 L2.04651163,12.2848837 C0.967629791,12.2848837 0.0837380148,11.450032 0.0056133117,10.3911057 L3.48165941e-13,10.2383721 L3.48165941e-13,2.79651163 C3.48165941e-13,1.66625447 0.916254465,0.75 2.04651163,0.75 L2.04651163,0.75 L13.9534884,0.75 C15.0837455,0.75 16,1.66625447 16,2.79651163 L16,2.79651163 L16,10.2383721 C16,11.3686293 15.0837455,12.2848837 13.9534884,12.2848837 L13.9534884,12.2848837 L8.558,12.284 L8.558,14.145 L10.9767442,14.1453488 C11.2849961,14.1453488 11.5348837,14.3952364 11.5348837,14.7034884 C11.5348837,14.9774901 11.3374417,15.2053768 11.0770705,15.2526355 L10.9767442,15.2616279 L5.02325581,15.2616279 Z M13.9534884,1.86627907 L2.04651163,1.86627907 C1.53275837,1.86627907 1.11627907,2.28275837 1.11627907,2.79651163 L1.11627907,2.79651163 L1.11627907,10.2383721 C1.11627907,10.7521253 1.53275837,11.1686047 2.04651163,11.1686047 L2.04651163,11.1686047 L13.9534884,11.1686047 C14.4672416,11.1686047 14.8837209,10.7521253 14.8837209,10.2383721 L14.8837209,10.2383721 L14.8837209,2.79651163 C14.8837209,2.28275837 14.4672416,1.86627907 13.9534884,1.86627907 L13.9534884,1.86627907 Z"
            id="Combined-Shape"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

export default SettingsBackgroundSvg;
