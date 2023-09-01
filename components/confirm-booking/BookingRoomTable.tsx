"use client";

import Booking from "@/models/booking";
import Table from "../Table";
import { format } from "date-fns";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

const generateTableData = (bookings: Booking[]) => {
  return bookings.map((booking) => ({
    ...booking,
    booking_duration: `${booking.booking_start} - ${booking.booking_end}`,
    booking_date: format(new Date(booking.booking_date), "EEEE, dd MMM yyyy"),
    room: booking.rooms.name,
    action: (
      <div className="flex flex-row gap-4">
        <XIcon className="block w-6 h-6 text-red-500 cursor-pointer hover:text-red-600" />
        <CheckIcon className="block w-6 h-6 text-green-500 cursor-pointer hover:text-green-600" />
      </div>
    ),
  }));
};

export default function BookingRoomTable({
  bookings,
}: {
  bookings: Booking[];
}) {
  const tableData = generateTableData(bookings);
  return (
    <Table
      title={[
        "booking_date",
        "room",
        "booking_duration",
        "booked_by",
        "action",
      ]}
      content={tableData}
    />
  );
}
