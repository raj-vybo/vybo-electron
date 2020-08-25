import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/esm/Button';

const VyboAccountButton = ({
  children,
  hasError,
  ...rest
}: { hasError: boolean } & ButtonProps) => {
  return (
    <Button
      variant="primary"
      block
      type="submit"
      {...rest}
      style={{
        width: '65%',
        borderRadius: '18px',
        marginTop: hasError ? '12px' : '32px',
        fontWeight: 'bold',
        outline: 'none',
        boxShadow: 'none',
      }}
    >
      {children}
    </Button>
  );
};

export default VyboAccountButton;
