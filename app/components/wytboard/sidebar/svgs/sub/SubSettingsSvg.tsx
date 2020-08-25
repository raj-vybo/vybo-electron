import React, { useState } from 'react';

const SubSettingsSvg = ({
  active,
  SvgElement,
  onMouseClick,
}: {
  active: boolean;
  SvgElement: ({ strokeColor }: { strokeColor: string }) => JSX.Element;
  onMouseClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  const getStrokeColor = (): string => {
    if (active) {
      return '#007AFF';
    }
    if (hovered) {
      return '#1E222D';
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
      <SvgElement strokeColor={getStrokeColor()} />
    </div>
  );
};

export default SubSettingsSvg;
