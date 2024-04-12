import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TodoDatePicker({ setDeadline }) {
  
  // // 文字列からDateオブジェクトに変換する関数
  // const parseDateStringToDate = (dateString) => {
  //   if (!dateString) return null; // nullを返すことでDatePickerに無効な日付が渡されないようにする
  //   return new Date(dateString);
  // };

  const handleDateChange = (date) => {
    // 日付が変更されたら deadline の値を更新する
    setDeadline(date.format('YYYY-MM-DD')); // 日付を文字列に変換してセットする
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="期限"
          inputFormat="YYYY-MM-DD"
          // value={parseDateStringToDate(deadline)} // 文字列からDateオブジェクトに変換する
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}