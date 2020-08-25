import React, { ReactNode } from 'react';
import VyboLogoSvg from 'resources/svgs/authentication/VyboLogoSvg.svg';
import Vybodescription from '../VyboDescription/VyboDescription';

import {
  MAIN_STYLES,
  LEFT_PANEL_STYLES,
  TOP_AREA_STYLES,
  WORKING_AREA_STYLES,
  BOTTOM_AREA_STYLES,
  MAIN_HEADING_TEXT_STYLES,
  SUB_HEADING_TEXT_STYLES,
} from './VyboAccountTemplateStyles';

type AccountTemplatePropsTypes = {
  children: {
    topContent?: ReactNode;
    mainHeading?: string;
    subHeading?: string;
    mainContent: ReactNode;
    bottomContent?: ReactNode;
  };
};

const VyboAccountTemplate = ({ children }: AccountTemplatePropsTypes) => {
  return (
    <main style={MAIN_STYLES}>
      <div style={LEFT_PANEL_STYLES}>
        {children.topContent && (
          <div style={TOP_AREA_STYLES}>{children.topContent}</div>
        )}
        <div style={WORKING_AREA_STYLES}>
          {/* Working Area Start */}
          <img src={VyboLogoSvg} alt="Vybo" style={{ marginBottom: '36px' }} />

          <p style={MAIN_HEADING_TEXT_STYLES}>
            {children.mainHeading || 'Whiteboarding made simpler.'}
          </p>

          {children.subHeading && (
            <p style={SUB_HEADING_TEXT_STYLES}>{children.subHeading}</p>
          )}

          <div className="w-100 d-flex align-items-center justify-content-center flex-column">
            {children.mainContent}
          </div>
          {/* Working Area End */}
        </div>
        {children.bottomContent && (
          <div style={BOTTOM_AREA_STYLES}>{children.bottomContent}</div>
        )}
      </div>
      <Vybodescription />
    </main>
  );
};

export default VyboAccountTemplate;
