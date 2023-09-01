import RoomAvailability from "@/components/home/RoomAvailability";
import Layout from "@/components/layout/Layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const currentDate = new Date();
  const { data: rooms } = await supabase.from("rooms").select();
  const { data: bookings } = await supabase
    .from("bookings")
    .select()
    .eq("booking_date", currentDate.toISOString().split("T")[0]);

  return (
    <Layout title="Home">
      <div className="flex flex-col gap-4 py-4">
        {rooms && (
          <RoomAvailability
            bookingDate={currentDate}
            rooms={rooms}
            initialBookings={bookings}
          />
        )}
      </div>
    </Layout>
  );
}
