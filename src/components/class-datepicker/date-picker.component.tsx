import React from 'react';

import { toUTC, utcToDate, getDays } from '../date-picker/date-picker.utils';
import { MONTHS } from '../date-picker/date-picker.constants';
import { PotentialDay, DayMap, Day } from '../date-picker/date-picker.types';
import { DefaultDay, DayProps } from '../date-picker/day.component';

type DatePickerState = {
  month: number;
  year: number;
  days: DayMap;
  startDate?: PotentialDay;
  endDate?: PotentialDay;
};

type DatePickerProps = {
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  multiselect?: boolean;
  DayComponent: React.ComponentType<DayProps>;
  MonthComponent: React.ReactElement<DayProps>;
  onSelected: (startDate: Day, endDate: Day) => void;
};

export class ClassDatePicker extends React.Component<DatePickerProps, DatePickerState> {
  static defaultProps = {
    DayComponent: DefaultDay,
    MonthComponent: DefaultDay,
  };

  // default start date to today
  public date = utcToDate(toUTC(new Date()));

  constructor(props: DatePickerProps) {
    super(props);

    if (props.date) {
      this.date = utcToDate(toUTC(props.date));
    }

    const month = this.date.getUTCMonth();
    const year = this.date.getUTCFullYear();
    const days = getDays([], year, month, this.getUTCMinDate(), this.getUTCMaxDate());

    // default state
    this.state = { year, month, days };
  }

  public componentWillUpdate(nextProps: DatePickerProps, nextState: DatePickerState) {
    const { onSelected } = nextProps;
    const { startDate, endDate } = nextState;
    if (startDate && endDate) {
      onSelected(startDate, endDate);
    }
  }

  private onSelectDay = (dateKey: string) => () => {
    const { days, startDate } = this.state;

    // don't select date if it's not enabled
    if (!days[dateKey].isEnabled) {
      return;
    }

    // select current date
    days[dateKey].isSelected = true;

    if (startDate) {
      days[startDate.key].isSelected = false;
    }

    return this.setState({
      days,
      startDate: days[dateKey],
      endDate: days[dateKey],
    });
  };

  private onNextMonth = () => {
    const { year, month, startDate, endDate } = this.state;
    let nextMonth = month + 1;
    let nextYear = year;

    if (nextMonth >= MONTHS.length) {
      nextMonth = 0;
      nextYear += 1;
    }

    let selectedDays: string[] = [];
    if (startDate && endDate) {
      selectedDays = [startDate.key, endDate.key];
    }

    this.setState({
      month: nextMonth,
      year: nextYear,
      days: getDays(selectedDays, nextYear, nextMonth, this.getUTCMinDate(), this.getUTCMaxDate()),
    });
  };

  private onPreviousMonth = () => {
    const { year, month, startDate, endDate } = this.state;
    let previousMonth = month - 1;
    let previousYear = year;

    if (previousMonth < 0) {
      previousMonth = MONTHS.length - 1;
      previousYear -= 1;
    }

    let selectedDays: string[] = [];
    if (startDate && endDate) {
      selectedDays = [startDate.key, endDate.key];
    }

    this.setState({
      month: previousMonth,
      year: previousYear,
      days: getDays(
        selectedDays,
        previousYear,
        previousMonth,
        this.getUTCMinDate(),
        this.getUTCMaxDate(),
      ),
    });
  };

  private getUTCMinDate = (): number => {
    let { minDate } = this.props;

    if (minDate) {
      return toUTC(minDate);
    }

    return 0;
  };

  private getUTCMaxDate = (): number => {
    let { maxDate } = this.props;

    if (maxDate) {
      return toUTC(maxDate);
    }

    return 0;
  };

  public render() {
    // destructure props
    const { DayComponent: Day } = this.props;
    const { month, year, days } = this.state;

    return (
      <>
        <div>year: {year}</div>
        <div>month: {MONTHS[month]}</div>
        <button onClick={this.onNextMonth}>next month</button>
        <button onClick={this.onPreviousMonth}>previous month</button>
        {Object.keys(days).map((key: string) => {
          const { day, date, isSelected, isEnabled } = days[key];
          return (
            <Day
              key={`day-${key}`}
              date={date}
              day={day}
              onSelect={this.onSelectDay(key)}
              isSelected={isSelected}
              isEnabled={isEnabled}
            />
          );
        })}
      </>
    );
  }
}
