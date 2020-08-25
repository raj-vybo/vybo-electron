import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/esm/Button';

export const NAVIGATION_BTN_STYLES: React.CSSProperties = {
  borderRadius: '18px',
  fontWeight: 600,
  outline: 'none',
  boxShadow: 'none',
  padding: '0px 24px',
  height: '36px',
  backgroundColor: '#0093FF',
};

const NavigationButton = ({
  extraStyles = {},
  ...rest
}: { extraStyles?: React.CSSProperties } & ButtonProps) => {
  return (
    <Button
      variant="primary"
      type="submit"
      style={{ ...NAVIGATION_BTN_STYLES, ...extraStyles }}
      {...rest}
    />
  );
};

export default NavigationButton;
