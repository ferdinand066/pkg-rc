"use client";

import DatepickerComponent from "../DatepickerComponent";

import { InputHTMLAttributes, useEffect, useState } from "react";
import InputText from "../form/InputText";
import { OtherInputProps } from "@/models/components/other-input-props";

export type InputDatepickerProps = InputHTMLAttributes<HTMLInputElement> &
  OtherInputProps;

export default function BookingDatepicker(props: InputDatepickerProps) {
  const { label, setValue, errors, register, id, name } = props;

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!setValue || !name) return;
    setValue(name, date.toISOString().split("T")[0]);
  }, [date]);

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="col-span-3 mt-1">
        <DatepickerComponent
          date={date}
          setDate={setDate}
          minDate={new Date()}
        />
        <InputText
          type="date"
          id={id}
          name={name}
          setValue={setValue}
          register={register}
          errors={errors}
          inputClassName="hidden"
        />
      </div>
    </>
  );
}
