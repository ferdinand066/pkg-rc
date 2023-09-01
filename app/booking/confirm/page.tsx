import BookingRoomTable from "@/components/confirm-booking/BookingRoomTable";
import Layout from "@/components/layout/Layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function ConfirmBookingPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`*, rooms (id, name)`)
    .is("accepted_by", null);

  return (
    <Layout title="Confirm Booking" user={user}>
      <div className="flex flex-col py-4">
        {bookings && (
          <BookingRoomTable initialBookings={bookings} user={user} />
        )}
      </div>
    </Layout>
  );
}
