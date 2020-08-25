import React from 'react';

import ThinStrokeSvg from 'components/wytboard/sidebar/svgs/sub/ThinStrokeSvg';
import MediumThickSvg from 'components/wytboard/sidebar/svgs/sub/MediumStrokeSvg';
import ThickStrokeSvg from 'components/wytboard/sidebar/svgs/sub/ThickStrokeSvg';
import SubMenuDividerSvg from 'components/wytboard/sidebar/svgs/sub/SubMenuDividerSvg';
import SubSettingsSvg from 'components/wytboard/sidebar/svgs/sub/SubSettingsSvg';
import BlackPenSvg from 'components/wytboard/sidebar/svgs/sub/BlackPenSvg';
import RedPenSvg from 'components/wytboard/sidebar/svgs/sub/RedPenSvg';
import BluePenSvg from 'components/wytboard/sidebar/svgs/sub/BluePenSvg';
import GreenPenSvg from 'components/wytboard/sidebar/svgs/sub/GreenPenSvg';

import penConfig from 'config/pen.config';

import { SUB_SETTINGS_PANEL_SETTINGS } from '../VyboSidebarStyles';

const TextConfigSettings = ({
  strokeWidth,
  strokeColor,
}: {
  strokeWidth: number;
  strokeColor: string;
}) => {
  return (
    <div style={SUB_SETTINGS_PANEL_SETTINGS}>
      <SubSettingsSvg
        SvgElement={ThinStrokeSvg}
        active={strokeWidth === 2}
        onMouseClick={() => penConfig.setChange({ strokeWidth: 2 })}
      />
      <SubSettingsSvg
        SvgElement={MediumThickSvg}
        active={strokeWidth === 4}
        onMouseClick={() => penConfig.setChange({ strokeWidth: 4 })}
      />
      <SubSettingsSvg
        SvgElement={ThickStrokeSvg}
        active={strokeWidth === 6}
        onMouseClick={() => penConfig.setChange({ strokeWidth: 6 })}
      />
      <SubMenuDividerSvg />
      <SubSettingsSvg
        SvgElement={BlackPenSvg}
        active={strokeColor === '#000'}
        onMouseClick={() => penConfig.setChange({ strokeColor: '#000' })}
      />
      <SubSettingsSvg
        SvgElement={RedPenSvg}
        active={strokeColor === '#DA0130'}
        onMouseClick={() => penConfig.setChange({ strokeColor: '#DA0130' })}
      />
      <SubSettingsSvg
        SvgElement={GreenPenSvg}
        active={strokeColor === '#13B30B'}
        onMouseClick={() => penConfig.setChange({ strokeColor: '#13B30B' })}
      />
      <SubSettingsSvg
        SvgElement={BluePenSvg}
        active={strokeColor === '#007AFF'}
        onMouseClick={() => penConfig.setChange({ strokeColor: '#007AFF' })}
      />
    </div>
  );
};

export default TextConfigSettings;
