import React, { ReactNode } from 'react';

import ErrorMsgSvg from 'resources/svgs/authentication/ErrorMsgSvg.svg';

const ERROR_MESSAGE_STYLES: React.CSSProperties = {
  backgroundColor: '#EE4646',
  color: '#fff',
  fontFamily: 'Raleway',
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: '14px',
  borderRadius: '20px',
  padding: '0.8em 1.4em',
  width: '65%',
  display: 'flex',
  alignContent: 'center',
  marginTop: '32px',
  marginBottom: '0px',
};

const VyboAccountErrorMsg = ({ children }: { children: ReactNode }) => {
  return (
    <p style={ERROR_MESSAGE_STYLES}>
      <img src={ErrorMsgSvg} className="mr-2" alt="error" />
      <span>{children}</span>
    </p>
  );
};

export default VyboAccountErrorMsg;
