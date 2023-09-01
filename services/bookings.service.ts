import { BookingFormProps } from "@/components/booking/BookingForm";
import Booking from "@/models/booking";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";

const supabase = createClientComponentClient();

const getBookings = async (date: Date): Promise<Booking[] | null> => {
  const { data } = await supabase
    .from("bookings")
    .select()
    .eq("booking_date", format(date, "yyyy-MM-dd"));

  return data;
};

const getPendingBookings = async (): Promise<Booking[] | null> => {
  const { data } = await supabase
    .from("bookings")
    .select(`*, rooms (id, name)`)
    .is("accepted_by", null);

  return data;
};

const createBooking = async (data: BookingFormProps) => {
  const bookingAvailabilty = await checkBookingAvailability(
    data.room_id,
    format(new Date(data.booking_date), "yyyy-MM-dd"),
    data.booking_start,
    data.booking_end
  );

  if (!bookingAvailabilty)
    throw new Error(
      "There have been transactions in this duration in the selected room."
    );

  const { error } = await supabase.from("bookings").insert(data);
  if (error) throw new Error(error.message);

  return 'Successfully create a new booking request!';
};

const deleteBooking = async (bookingId: string) => {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error(error.message);
  return 'Successfully delete booking request!';
};

const acceptBooking = async (bookingId: string, userId: string) => {
  const { error } = await supabase
    .from("bookings")
    .update({ accepted_by: userId })
    .eq("id", bookingId);
  if (error) throw new Error(error.message);
  return "Successfully accept booking request!";
};

const checkBookingAvailability = async (
  roomId: string,
  date: string,
  bookingStart: string,
  bookingEnd: string
): Promise<boolean> => {
  const { data: bookings } = await supabase
    .from("bookings")
    .select()
    .eq("room_id", roomId)
    .eq("booking_date", date);

  if (!bookings) return true;

  return !bookings.some(
    (booking: Booking) =>
      (bookingStart >= booking.booking_start &&
        bookingStart <= booking.booking_end) ||
      (bookingEnd >= booking.booking_start && bookingEnd <= booking.booking_end)
  );
};

export {
  getBookings,
  createBooking,
  deleteBooking,
  acceptBooking,
  getPendingBookings,
  checkBookingAvailability,
};
