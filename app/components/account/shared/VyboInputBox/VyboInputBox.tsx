import React from 'react';
import {
  INPUT_BOX_STYLES,
  INPUT_BOX_ICON_STYLES,
  INPUT_BOX_ERROR_MSG_STYLES,
  INPUT_BOX_CONTAINER_STYLES,
} from './VyboInputBoxStyles';

type VyboInputProps = {
  iconSource: string;
  iconAlt: string;
  error?: string;
  iconClick?: () => void;
};
type VyboInputBoxProps = VyboInputProps & React.HTMLProps<HTMLInputElement>;

const VyboInputBox = ({
  iconSource,
  iconAlt,
  error,
  iconClick,
  ...rest
}: VyboInputBoxProps) => {
  const borderStyle: React.CSSProperties = error
    ? { border: '1px solid #EE4646' }
    : { border: '0px' };

  return (
    <div style={INPUT_BOX_CONTAINER_STYLES}>
      <input style={{ ...INPUT_BOX_STYLES, ...borderStyle }} {...rest} />
      <img
        src={iconSource}
        style={INPUT_BOX_ICON_STYLES}
        alt={iconAlt}
        onClick={iconClick}
      />
      {error && <p style={INPUT_BOX_ERROR_MSG_STYLES}>{error}</p>}
    </div>
  );
};

export default VyboInputBox;
