"use client";

import Booking from "@/models/booking";
import Table from "../Table";
import { format } from "date-fns";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { acceptBooking, deleteBooking, getPendingBookings } from "@/services/bookings.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export default function BookingRoomTable({
  initialBookings,
  user,
}: {
  initialBookings: Booking[];
  user: any;
}) {
  const queryClient = useQueryClient();

  const { data: bookings } = useQuery({
    queryKey: ["confirm-bookings"],
    queryFn: getPendingBookings,
    initialData: initialBookings,
  });

  const handleAcceptBooking = async (bookingId: string, userId: string) => {
    await acceptBooking(bookingId, userId);
    queryClient.invalidateQueries({ queryKey: ["confirm-bookings"] });
  };

  const handleDeclineBooking = async (bookingId: string) => {
    await deleteBooking(bookingId);
    queryClient.invalidateQueries({ queryKey: ["confirm-bookings"] });
  };

  const generateTableData = (bookings: Booking[], userId: string) => {
    return bookings.map((booking) => ({
      ...booking,
      booking_duration: `${booking.booking_start} - ${booking.booking_end}`,
      booking_date: format(new Date(booking.booking_date), "EEEE, dd MMM yyyy"),
      room: booking.rooms.name,
      action: (
        <div className="flex flex-row gap-4">
          <XIcon
            className="block w-6 h-6 text-red-500 cursor-pointer hover:text-red-600"
            onClick={() => handleDeclineBooking(booking.id)}
          />
          <CheckIcon
            className="block w-6 h-6 text-green-500 cursor-pointer hover:text-green-600"
            onClick={() => handleAcceptBooking(booking.id, userId)}
          />
        </div>
      ),
    }));
  };

  const tableData = generateTableData(bookings!, user.id);
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
