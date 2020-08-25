import React from 'react';
import {
  DESC_AREA_STYLES,
  DESC_STYLES,
  DESC_MAIN_HEADING_STYLES,
  BANNER_CONTAINER_STYLES,
  DESC_SUB_HEADING_STYLES,
} from './VyboDescriptionStyles';

const Vybodescription = () => {
  return (
    <div style={DESC_AREA_STYLES}>
      <div style={DESC_STYLES}>
        <p style={DESC_MAIN_HEADING_STYLES}>Point. Draw. Discuss</p>
        <p style={DESC_SUB_HEADING_STYLES}>
          With Vybo.io now you can remotely whiteboard with your teammates in an
          easier, more efficient and more engaging way. Log In or Sign Up to
          find out!
        </p>
      </div>
      <div style={BANNER_CONTAINER_STYLES} />
    </div>
  );
};

export default Vybodescription;
