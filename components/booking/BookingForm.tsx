'use client';

import { useForm } from "react-hook-form";
import InputText from "../form/InputText";
import SubmitButtonGroup from "../form/SubmitButtonGroup";
import BookingDatepicker from "./BookingDatepicker";
import { createBooking } from "@/services/bookings.service";
import { useState } from "react";
import InputSelect from "../form/InputSelect";

export type BookingFormProps = {
  room_id: string;
  booked_by: string;
  booking_date: Date;
  booking_start: Date;
  booking_end: Date;
};

export default function BookingForm({ rooms }: { rooms: any[] }) {
  const handleCreateBookingForm = async (data: BookingFormProps) => {
    const payload = {
      ...data,
      accepted_by: null,
    };
    
    setLoading(true);
    await createBooking(payload);
    setLoading(false);
    reset();
  }
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BookingFormProps>();

  const [loading, setLoading] = useState(false);

  return (
    <form
      className="py-6 space-y-6"
      method="POST"
      onSubmit={handleSubmit(handleCreateBookingForm)}
    >
      <div className="grid items-center grid-cols-4">
        <InputSelect
          label="Room"
          id="room_id"
          name="room_id"
          model={rooms}
          setValue={setValue}
          register={register("room_id", {
            required: "Room is required",
          })}
          errors={errors}
        />
      </div>
      <div className="grid items-center grid-cols-4">
        <InputText
          label="Booked By"
          id="booked_by"
          type="text"
          name="booked_by"
          setValue={setValue}
          register={register("booked_by", {
            required: "Booked by is required",
          })}
          errors={errors}
        />
      </div>
      <div className="grid items-center grid-cols-4">
        <BookingDatepicker
          label="Booking Date"
          id="booking_date"
          name="booking_date"
          setValue={setValue}
          register={register("booking_date", {
            required: "Booking date is required",
          })}
          errors={errors}
        />
      </div>
      <div className="grid items-center grid-cols-4">
        <InputText
          label="Booking Start"
          id="booking_start"
          type="time"
          name="booking_start"
          setValue={setValue}
          register={register("booking_start", {
            required: "Booked start is required",
          })}
          errors={errors}
        />
      </div>
      <div className="grid items-center grid-cols-4">
        <InputText
          label="Booking End"
          id="booking_end"
          type="time"
          name="booking_end"
          setValue={setValue}
          register={register("booking_end", {
            required: "Booking end is required",
            validate: (bookingEnd) => {
              return bookingEnd <= getValues("booking_start")
                ? "Booking end must be greater than booking start"
                : true;
            },
          })}
          errors={errors}
        />
      </div>
      <div className="flex flex-col justify-end gap-4 sm:flex-row">
        <SubmitButtonGroup text="Create" reset={reset} loading={loading} />
      </div>
    </form>
  );
}
