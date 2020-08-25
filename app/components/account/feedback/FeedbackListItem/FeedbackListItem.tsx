import React from 'react';

const defaultStyles: React.CSSProperties = {
  backgroundColor: '#3B404E',
  borderRadius: '18px',
  color: '#9FA5AE',
  fontFamily: 'Raleway',
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: '16px',
  textAlign: 'center',
  padding: '10px 24px',
  margin: '6px 6px',
  cursor: 'pointer',
  border: '1px solid #3B404E',
};

const activeStyles: React.CSSProperties = {
  ...defaultStyles,
  color: '#0093FF',
  border: '1px solid #0093FF',
  backgroundColor: '#BFE4FF',
};

const FeedbackListItem = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <p style={active ? activeStyles : defaultStyles} onClick={onClick}>
      {text}
    </p>
  );
};

export default FeedbackListItem;
