"use client";

import { getRooms } from "@/services/rooms.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatepickerComponent from "../DatepickerComponent";
import Table from "../Table";
import Room from "@/models/rooms";
import Booking from "@/models/booking";
import { getBookings } from "@/services/bookings.service";
import { format } from "date-fns";

type RoomAvailabilityProps = {
  bookingDate: Date;
  rooms: Room[];
  initialBookings: Booking[] | null;
};

const generateRoomAndBooking = (
  rooms: Room[] | null,
  bookings: Booking[] | null
) => {
  if (!rooms || !bookings) return null;

  const mappingResult: Record<string, Booking[]> = {};
  let mostBooking = -1;

  rooms.forEach((room) => {
    const bookingInTheRoom = bookings
      .filter((booking) => booking.room_id === room.id)
      .sort((a, b) => a.booking_start.localeCompare(b.booking_start));
    if (bookingInTheRoom.length > mostBooking)
      mostBooking = bookingInTheRoom.length;
    mappingResult[room.name] = bookingInTheRoom;
  });

  const result = [];

  for (let i = 0; i < mostBooking; i++) {
    const rowResult = Object.keys(mappingResult).map((roomName) => {
      const roomData = mappingResult[roomName][i];
      if (!roomData) return "-";

      return (
        <span className="flex flex-row gap-5">
          <span className="font-semibold">
            {roomData.booking_start} - {roomData.booking_end}{" "}
          </span>
          by. {roomData.booked_by}
        </span>
      );
    });

    const obj: Record<string, string | JSX.Element> = {};
    Object.keys(mappingResult).forEach(
      (roomName, index) => obj[roomName] = rowResult[index]
    );

    result.push(obj);
  }

  return result;
};

export default function RoomAvailability({
  bookingDate,
  rooms,
  initialBookings,
}: RoomAvailabilityProps) {
  const [date, setDate] = useState(bookingDate);
  const { data: bookings } = useQuery({
    queryKey: ["bookings", date],
    queryFn: () => getBookings(date),
    initialData: initialBookings,
  });

  const tableData = generateRoomAndBooking(rooms, bookings);

  return (
    <>
      <DatepickerComponent date={date} setDate={setDate} />
      {tableData && bookings && bookings?.length > 0 ? (
        <Table title={rooms.map((room) => room.name)} content={tableData} />
      ) : (
        <span>There's no booking in {format(date, "EEEE, dd MMM yyyy")}</span>
      )}
    </>
  );
}
