import React, { ReactNode } from 'react';

import SuccessMsgSvg from 'resources/svgs/authentication/SuccessMsgSvg.svg';

import './VyboAccountSuccessStyles.css';

const SUCCESS_MESSAGE_STYLES: React.CSSProperties = {
  backgroundColor: '#13B30B',
  color: '#fff',
  fontFamily: 'Raleway',
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: '14px',
  borderRadius: '20px',
  padding: '0.8em 1.4em',
  display: 'flex',
  alignContent: 'center',
  marginTop: '36px',
};

const VyboAccountSuccessMsg = ({ children }: { children: ReactNode }) => {
  return (
    <p style={SUCCESS_MESSAGE_STYLES} className="shakeAnimation">
      <img src={SuccessMsgSvg} className="mr-2" alt="error" />
      <span>{children}</span>
    </p>
  );
};

export default VyboAccountSuccessMsg;
