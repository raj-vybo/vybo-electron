import React, { ReactNode } from 'react';

const MainSvgHovertext = ({ children }: { children: ReactNode }) => {
  return (
    <p
      style={{
        position: 'absolute',
        backgroundColor: '#3B404E',
        borderRadius: '4px',
        display: 'flex',
        width: 'max-content',
        zIndex: 9999,
        padding: '5px 8px',
        color: '#FFFFFF',
        fontFamily: 'Raleway',
        fontSize: '12px',
        letterSpacing: '0',
        lineHeight: '14px',
        top: '18px',
        left: '44px',
      }}
    >
      {children}
    </p>
  );
};

export default MainSvgHovertext;
