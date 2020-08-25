import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

const styles: React.CSSProperties = {
  borderRadius: '20px',
  width: '177px',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  boxShadow: 'none',
  marginBottom: '12px',
  textAlign: 'left',
  paddingLeft: '18px',
  fontFamily: 'Raleway',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: '16px',
  paddingTop: '8px',
  paddingBottom: '6px',
};

const activeStyles: React.CSSProperties = {
  ...styles,
  backgroundColor: '#007AFF',
};
type SettingsButtonProps = {
  active: boolean;
  SvgElement: (
    props: { active: boolean } & React.SVGProps<SVGSVGElement>
  ) => JSX.Element;
} & ButtonProps;

const SettingsPopupButton = ({
  active,
  SvgElement,
  ...rest
}: SettingsButtonProps) => {
  return (
    <Button {...rest} style={active ? activeStyles : styles}>
      <SvgElement
        active={active}
        style={{ marginRight: '10px', marginBottom: '2px' }}
      />
      {rest.children}
    </Button>
  );
};

export default SettingsPopupButton;
