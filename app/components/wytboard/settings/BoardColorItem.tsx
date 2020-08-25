import React from 'react';

type BoardItemGetStyles = (
  color: string,
  height: number,
  width: number,
  active: boolean
) => React.CSSProperties;

type BoardItemPropTypes = {
  color: string;
  height: number;
  width: number;
  active: boolean;
} & React.HTMLProps<HTMLDivElement>;

const styles: BoardItemGetStyles = (color, height, width, active) => {
  return {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    border: `2px solid ${active ? '#007AFF' : color}`,
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '4px',
  };
};

const BoardColorItem = ({
  color,
  height,
  width,
  active,
  ...rest
}: BoardItemPropTypes) => {
  return <div style={styles(color, height, width, active)} {...rest} />;
};

export default BoardColorItem;
