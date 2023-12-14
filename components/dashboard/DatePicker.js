import React, { useState } from 'react';
import Datepicker from "tailwind-datepicker-react";



const DateComponent = (props) => {
  const { date, setDate } = props;
  const [show, setShow] = useState(false);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleClose = (state) => {
    setShow(state);
  };
  const options = {
    title: 'Demo Title',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'Clear',
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: 'bg-gray-300 dark:bg-gray-800',
      todayBtn: '',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: 'bg-gray-400 dark:bg-gray-500',
      input: '',
      inputIcon: '',
      selected: '',
    },
    icons: {
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: 'top-12',
    defaultDate: date || new Date(),
    language: 'en',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select Date',
    inputDateFormatProp: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  };
  return (
    <div>
      <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
    </div>
  );
};

export default DateComponent;
