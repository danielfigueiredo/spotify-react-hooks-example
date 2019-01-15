import React from 'react';
import { DatePicker } from 'src/components/date-picker/date-picker.component';
import { Day } from 'src/components/date-picker/date-picker.types';
import { ClassDatePicker } from 'src/components/class-datepicker/date-picker.component';

export const Dashboard = () => {
  const lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  return (
    <div>
      <div>Functional Date picker</div>
      <DatePicker
        minDate={lastWeek}
        maxDate={tomorrow}
        onSelected={(startDate: any, endDate: any) => {
          console.log(startDate, endDate);
        }}
      />

      <div>Class Date picker</div>
      <ClassDatePicker
        onSelected={(startDate: any, endDate: any) => {
          console.log(startDate, endDate);
        }}
      />
    </div>
  );
};
