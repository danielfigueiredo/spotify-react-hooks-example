import React from 'react';
import { DatePicker } from 'src/components/date-picker/date-picker.component';
import { Day } from 'src/components/date-picker/date-picker.types';

export const Dashboard = () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  return (
    <div>
      <div>summary route</div>
      <DatePicker
        minDate={yesterday}
        maxDate={tomorrow}
        onSelected={(startDate: any, endDate: any) => {
          console.log(startDate, endDate);
        }}
      />

      <div>multiselect</div>
      <DatePicker
        multiselect
        onSelected={(startDate: any, endDate: any) => {
          console.log(startDate, endDate);
        }}
      />
    </div>
  );
};
