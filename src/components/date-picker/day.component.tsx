import React from 'react';

export type DayProps = {
  date: Date;
  day: number;
  onSelect: () => void;
  isSelected: boolean;
  isEnabled: boolean;
};

export const DefaultDay: React.FunctionComponent<DayProps> = ({
  day,
  isEnabled,
  isSelected,
  onSelect,
}) => (
  <span
    onClick={onSelect}
    style={{
      paddingLeft: '5px',
      paddingBottom: '2px',
      color: isEnabled ? 'blue' : 'red',
      backgroundColor: isSelected ? 'yellow' : 'white',
      cursor: 'pointer',
    }}
  >
    {day}
  </span>
);
