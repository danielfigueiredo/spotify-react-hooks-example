import React, { useState, useEffect } from 'react';

import { toUTC, utcToDate, getDays } from './date-picker.utils';
import { MONTHS } from './date-picker.constants';
import { PotentialDay, DayMap, Day } from './date-picker.types';
import { DefaultDay, DayProps } from './day.component';

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
  DayComponent?: React.FunctionComponent<DayProps>;
  onSelected: (startDate: PotentialDay, endDate: PotentialDay) => void;
};

const selectDay = ({ days, startDate, endDate, multiselect }: any) => (
  dateKey: string,
  callback: (data: any) => any,
) => () => {
  // don't select date if it's not enabled
  if (!days[dateKey].isEnabled) {
    return;
  }

  // select current date
  days[dateKey].isSelected = true;

  //   if (multiselect) {
  //     return this.multiSelect(days, dateKey, startDate, endDate);
  //   }

  if (startDate) {
    days[startDate.key].isSelected = false;
  }

  return callback({
    days,
    startDate: days[dateKey],
    endDate: days[dateKey],
  });
};

//@ts-ignore
const nextMonth = ({ year, month, minDate, maxDate }) => callback => () => {
  let nextMonth = month + 1;
  let nextYear = year;

  if (nextMonth >= MONTHS.length) {
    nextMonth = 0;
    nextYear += 1;
  }

  return callback({
    month: nextMonth,
    year: nextYear,
    days: getDays(nextYear, nextMonth, toUTC(minDate), toUTC(maxDate)),
  });
};

//@ts-ignore
const previousMonth = ({ year, month, minDate, maxDate }) => callback => () => {
  let previousMonth = month - 1;
  let previousYear = year;

  if (previousMonth < 0) {
    previousMonth = MONTHS.length - 1;
    previousYear -= 1;
  }

  return callback({
    month: previousMonth,
    year: previousYear,
    days: getDays(previousYear, previousMonth, toUTC(minDate), toUTC(maxDate)),
  });
};

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  date,
  minDate,
  maxDate,
  multiselect,
  onSelected,
  DayComponent: Day = DefaultDay,
}) => {
  let start = utcToDate(toUTC(new Date()));
  if (date) {
    start = utcToDate(toUTC(date));
  }
  const [month, setMonth] = useState(start.getUTCMonth());
  const [year, setYear] = useState(start.getUTCFullYear());
  const [days, setDays] = useState(getDays(year, month, toUTC(minDate), toUTC(maxDate)));
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  useEffect(() => {
    if (startDate && endDate) {
      onSelected(startDate, endDate);
    }
  }, []);

  const onSelectDay = selectDay({ days, startDate, endDate, multiselect });
  const onNextMonth = nextMonth({ year, month, minDate, maxDate });
  const onPreviousMonth = previousMonth({ year, month, minDate, maxDate });
  return (
    <>
      <div>year: {year}</div>
      <div>month: {MONTHS[month]}</div>
      <button
        onClick={onNextMonth(({ month, year, days }: any) => {
          setMonth(month);
          setYear(year);
          setDays(days);
        })}
      >
        next month
      </button>
      <button
        onClick={onPreviousMonth(({ month, year, days }: any) => {
          setMonth(month);
          setYear(year);
          setDays(days);
        })}
      >
        previous month
      </button>
      {Object.keys(days).map((key: string) => {
        const { rawDate, date, isSelected, isEnabled } = days[key];
        return (
          <Day
            key={`day-${rawDate[2]}`}
            rawDate={rawDate}
            date={date}
            day={rawDate[2]}
            onSelect={onSelectDay(key, ({ days, startDate, endDate }) => {
              setDays(days);
              setStartDate(startDate);
              setEndDate(endDate);
            })}
            isSelected={isSelected}
            isEnabled={isEnabled}
          />
        );
      })}
    </>
  );
};


// export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
//   static defaultProps = {
//     DayComponent: DefaultDay,
//     MonthComponent: DefaultDay,
//   };

//   // default start date to today
//   public date = utcToDate(toUTC(new Date()));

//   constructor(props: DatePickerProps) {
//     super(props);

//     if (props.date) {
//       this.date = utcToDate(toUTC(props.date));
//     }

//     const month = this.date.getUTCMonth();
//     const year = this.date.getUTCFullYear();
//     const days = getDays(year, month, this.getUTCMinDate(), this.getUTCMaxDate());

//     // default state
//     this.state = { year, month, days };
//   }

//   public componentWillUpdate(nextProps: DatePickerProps, nextState: DatePickerState) {
//     const { onSelected } = nextProps;
//     const { startDate, endDate } = nextState;
//     if (startDate && endDate) {
//       onSelected(startDate, endDate);
//     }
//   }

//   private multiSelect = (
//     days: DayMap,
//     dateKey: string,
//     startDate: PotentialDay,
//     endDate: PotentialDay,
//   ) => {
//     let newStartDate: PotentialDay = startDate;
//     let newEndDate: PotentialDay = endDate;

//     if (!startDate) {
//       newStartDate = days[dateKey];
//     }

//     if (startDate && !endDate) {
//       if (days[dateKey].utc < startDate.utc) {
//         days[startDate.key].isSelected = false;
//         newStartDate = days[dateKey];
//       } else {
//         newEndDate = days[dateKey];
//       }
//     }

//     if (startDate && endDate) {
//       days[startDate.key].isSelected = false;
//       days[endDate.key].isSelected = false;
//       newStartDate = days[dateKey];
//       newEndDate = undefined;
//     }

//     return this.setState({
//       days,
//       startDate: newStartDate,
//       endDate: newEndDate,
//     });
//   };

//   private onSelectDay = (dateKey: string) => () => {
//     const { days, startDate, endDate } = this.state;
//     const { multiselect } = this.props;

//     // don't select date if it's not enabled
//     if (!days[dateKey].isEnabled) {
//       return;
//     }

//     // select current date
//     days[dateKey].isSelected = true;

//     if (multiselect) {
//       return this.multiSelect(days, dateKey, startDate, endDate);
//     }

//     if (startDate) {
//       days[startDate.key].isSelected = false;
//     }

//     return this.setState({
//       days,
//       startDate: days[dateKey],
//       endDate: days[dateKey],
//     });
//   };

//   private onNextMonth = () => {
//     const { year, month } = this.state;
//     let nextMonth = month + 1;
//     let nextYear = year;

//     if (nextMonth >= MONTHS.length) {
//       nextMonth = 0;
//       nextYear += 1;
//     }

//     this.setState({
//       month: nextMonth,
//       year: nextYear,
//       days: getDays(nextYear, nextMonth, this.getUTCMinDate(), this.getUTCMaxDate()),
//     });
//   };

//   private onPreviousMonth = () => {
//     const { year, month } = this.state;
//     let previousMonth = month - 1;
//     let previousYear = year;

//     if (previousMonth < 0) {
//       previousMonth = MONTHS.length - 1;
//       previousYear -= 1;
//     }

//     this.setState({
//       month: previousMonth,
//       year: previousYear,
//       days: getDays(previousYear, previousMonth, this.getUTCMinDate(), this.getUTCMaxDate()),
//     });
//   };

//   private getUTCMinDate = (): number => {
//     let { minDate } = this.props;

//     if (minDate) {
//       return toUTC(minDate);
//     }

//     return 0;
//   };

//   private getUTCMaxDate = (): number => {
//     let { maxDate } = this.props;

//     if (maxDate) {
//       return toUTC(maxDate);
//     }

//     return 0;
//   };

//   public render() {
//     // destructure props
//     const { DayComponent: Day } = this.props;
//     const { month, year, days } = this.state;

//     return (
//       <>
//         <div>year: {year}</div>
//         <div>month: {MONTHS[month]}</div>
//         <button onClick={this.onNextMonth}>next month</button>
//         <button onClick={this.onPreviousMonth}>previous month</button>
//         {Object.keys(days).map((key: string) => {
//           const { rawDate, date, isSelected, isEnabled } = days[key];
//           return (
//             <Day
//               key={`day-${rawDate[2]}`}
//               rawDate={rawDate}
//               date={date}
//               day={rawDate[2]}
//               onSelect={this.onSelectDay(key)}
//               isSelected={isSelected}
//               isEnabled={isEnabled}
//             />
//           );
//         })}
//       </>
//     );
//   }
// }
