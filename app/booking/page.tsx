import BookingForm from "@/components/booking/BookingForm";
import Layout from "@/components/layout/Layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function CreateBookingPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rooms } = await supabase.from("rooms").select();

  return (
    <Layout title="Create Booking" user={user}>
      {rooms && <BookingForm rooms={rooms} />}
    </Layout>
  );
}
