"use client";

import { addYears } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const currentDate = new Date();

type DatepickerComponentProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  minDate?: Date;
};

export default function DatepickerComponent({
  date,
  setDate,
  minDate,
}: DatepickerComponentProps) {
  const [show, setShow] = useState<boolean>(false);

  const options = {
    title: "Room Booking Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: addYears(currentDate, 1),
    minDate: minDate ?? addYears(currentDate, -1),
    icons: {
      prev: () => (
        <ChevronLeftIcon className="block w-6 h-6" aria-hidden="true" />
      ),
      next: () => (
        <ChevronRightIcon className="block w-6 h-6" aria-hidden="true" />
      ),
    },
    // datepickerClassNames: "top-12",
    defaultDate: date,
    language: "en",
  };

  const handleChange = (selectedDate: Date) => {
    if (selectedDate < options.minDate || selectedDate > options.maxDate)
      return;
    setDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div className="relative">
      <DatePicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
}
