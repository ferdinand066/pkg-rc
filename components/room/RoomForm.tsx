'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "../form/InputText";
import SubmitButtonGroup from "../form/SubmitButtonGroup";
import { createRoom } from "@/services/rooms.service";
import { useQueryClient } from "@tanstack/react-query";

export type RoomFormProps = {
  name: string,
  capacity: number,
};

export default function RoomForm() {
  const handleCreateRoomForm = async (data: RoomFormProps) => {
    setLoading(true);
    await createRoom(data);
    setLoading(false);
    reset();
    queryClient.invalidateQueries({queryKey: ['rooms']});
    queryClient.invalidateQueries({queryKey: ['booking']});
  }
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RoomFormProps>();

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  return (
    <form
      className="py-6 space-y-6"
      method="POST"
      onSubmit={handleSubmit(handleCreateRoomForm)}
    >
      <div className="grid items-center grid-cols-4">
        <InputText
          label="Room Name"
          id="name"
          type="text"
          name="name"
          setValue={setValue}
          register={register("name", {
            required: "Room name is required",
          })}
          errors={errors}
        />
      </div>
      <div className="grid items-center grid-cols-4">
        <InputText
          label="Room Capacity"
          id="capacity"
          type="number"
          min={1}
          name="capacity"
          setValue={setValue}
          register={register("capacity", {
            required: "Booked start is required",
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
