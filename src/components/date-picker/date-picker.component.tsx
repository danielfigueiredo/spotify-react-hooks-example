import React, { useState, useEffect } from 'react';

import { toUTC, utcToDate, getDays } from './date-picker.utils';
import { MONTHS } from './date-picker.constants';
import { PotentialDay, Day } from './date-picker.types';
import { DefaultDay, DayProps } from './day.component';
import { selectDay, nextMonth, previousMonth } from './date-picker.handlers';

type DatePickerProps = {
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  multiselect?: boolean;
  DayComponent?: React.FunctionComponent<DayProps>;
  onSelected: (startDate: PotentialDay, endDate: PotentialDay) => void;
};

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  date,
  minDate,
  maxDate,
  multiselect = false,
  onSelected,
  DayComponent: Day = DefaultDay,
}) => {
  let start = utcToDate(toUTC(new Date()));
  if (date) {
    start = utcToDate(toUTC(date));
  }

  const [month, setMonth] = useState(start.getUTCMonth());
  const [year, setYear] = useState(start.getUTCFullYear());
  const [startDate, setStartDate] = useState<Day | undefined>(undefined);
  const [endDate, setEndDate] = useState<Day | undefined>(undefined);
  const [days, setDays] = useState(getDays([], year, month, toUTC(minDate), toUTC(maxDate)));

  useEffect(() => {
    if (startDate && endDate) {
      onSelected(startDate, endDate);
    }
  });

  let selectedDays: string[] = [];
  if (startDate && endDate) {
    selectedDays = [startDate.key, endDate.key];
  }

  const onSelectDay = selectDay({ days, startDate, endDate, multiselect })([
    setDays,
    setStartDate,
    setEndDate,
  ]);
  const onNextMonth = nextMonth({ selectedDays, year, month, minDate, maxDate })([
    setMonth,
    setYear,
    setDays,
  ]);
  const onPreviousMonth = previousMonth({ selectedDays, year, month, minDate, maxDate })([
    setMonth,
    setYear,
    setDays,
  ]);

  return (
    <>
      <div>year: {year}</div>
      <div>month: {MONTHS[month]}</div>
      <button onClick={onNextMonth}>next month</button>
      <button onClick={onPreviousMonth}>previous month</button>
      {Object.keys(days).map((key: string) => {
        const { date, isSelected, isEnabled, day } = days[key];
        return (
          <Day
            key={`day-${key}`}
            date={date}
            day={day}
            onSelect={onSelectDay(key)}
            isSelected={isSelected}
            isEnabled={isEnabled}
          />
        );
      })}
    </>
  );
};
