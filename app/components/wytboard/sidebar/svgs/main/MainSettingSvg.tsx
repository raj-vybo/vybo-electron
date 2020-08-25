import React, { useState } from 'react';
import MainSvgHovertext from '../HoverText';

const MainSettingsSvg = ({
  active,
  SvgElement,
  hoverText,
  onMouseClick,
}: {
  active: boolean;
  SvgElement: ({ fillColor }: { fillColor: string }) => JSX.Element;
  hoverText: string;
  onMouseClick: () => void;
} & React.HTMLProps<HTMLDivElement>) => {
  const [hovered, setHovered] = useState(false);

  const getFillColor = (): string => {
    if (active) {
      return '#007AFF';
    }
    if (hovered) {
      return '#000';
    }
    return '#2A303E';
  };

  return (
    <div
      style={{
        position: 'relative',
        cursor: 'pointer',
        border: 0,
        boxShadow: 'none',
        outline: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onMouseClick}
      role="button"
      tabIndex={0}
      className="clickable"
    >
      <SvgElement fillColor={getFillColor()} />
      {hovered && hoverText && <MainSvgHovertext>{hoverText}</MainSvgHovertext>}
    </div>
  );
};

export default MainSettingsSvg;
