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

const createBooking = async (data: BookingFormProps) => {
  const { error } = await supabase.from("bookings").insert(data);
  return error?.message;
}

export { getBookings, createBooking };
