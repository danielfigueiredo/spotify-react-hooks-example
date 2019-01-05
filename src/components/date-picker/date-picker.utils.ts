import { DayMap } from './date-picker.types';
import { DAY_OFFSET } from './date-picker.constants';

export const toUTC = (date?: Date): number => {
  if (!date) return 0;
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

export const toDate = (year: number, month: number, day: number) => new Date(year, month, day);

export const utcToDate = (utc: number) => new Date(utc);

// start at next month to get previous month's days
export const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export const getDays = (
  year: number,
  month: number,
  utcMinDate: number,
  utcMaxDate: number,
): DayMap => {
  // create and populate empty array from number
  const noOfDays = Array.from(Array(daysInMonth(year, month)));

  // shape day object
  return noOfDays.reduce((days, _, day: number) => {
    const date = toDate(year, month, day + DAY_OFFSET);
    const key = `${year}-${month}-${day + DAY_OFFSET}`;
    days[key] = {
      key,
      date,
      utc: toUTC(date),
      rawDate: [year, month, day + DAY_OFFSET],
      isSelected: false,
      isEnabled:
        utcMinDate || utcMaxDate ? toUTC(date) >= utcMinDate && toUTC(date) <= utcMaxDate : true,
    };
    return days;
  }, {});
};
