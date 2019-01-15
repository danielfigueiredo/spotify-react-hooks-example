import { getDays, toUTC } from './date-picker.utils';
import { MONTHS } from './date-picker.constants';
import { DayMap, PotentialDay } from './date-picker.types';

type SelectDayParams = {
  days: DayMap;
  startDate: PotentialDay;
  endDate: PotentialDay;
  multiselect: boolean;
};
type MonthHandlerParams = {
  selectedDays: string[];
  year: number;
  month: number;
  minDate: Date | undefined;
  maxDate: Date | undefined;
};

type StateHandler = (...params: any) => void;
type StateUpdateHandlers = StateHandler[];

export const selectDay = ({ days, startDate, endDate, multiselect }: SelectDayParams) => ([
  setDays,
  setStartDate,
  setEndDate,
]: StateUpdateHandlers) => (dateKey: string) => () => {
  // don't select date if it's not enabled
  if (!days[dateKey].isEnabled) {
    return;
  }

  // select current date
  days[dateKey].isSelected = true;

  if (startDate && days[startDate.key]) {
    days[startDate.key].isSelected = false;
  }

  setDays(days);
  setStartDate(days[dateKey]);
  setEndDate(days[dateKey]);
};

export const nextMonth = ({ selectedDays, year, month, minDate, maxDate }: MonthHandlerParams) => ([
  setMonth,
  setYear,
  setDays,
]: StateUpdateHandlers) => () => {
  let nextMonth = month + 1;
  let nextYear = year;

  if (nextMonth >= MONTHS.length) {
    nextMonth = 0;
    nextYear += 1;
  }

  setMonth(nextMonth);
  setYear(nextYear);
  setDays(getDays(selectedDays, nextYear, nextMonth, toUTC(minDate), toUTC(maxDate)));
};

export const previousMonth = ({
  selectedDays,
  year,
  month,
  minDate,
  maxDate,
}: MonthHandlerParams) => ([setMonth, setYear, setDays]: StateUpdateHandlers) => () => {
  let previousMonth = month - 1;
  let previousYear = year;

  if (previousMonth < 0) {
    previousMonth = MONTHS.length - 1;
    previousYear -= 1;
  }

  setMonth(previousMonth);
  setYear(previousYear);
  setDays(getDays(selectedDays, previousYear, previousMonth, toUTC(minDate), toUTC(maxDate)));
};
