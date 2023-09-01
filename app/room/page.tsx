import Layout from "@/components/layout/Layout";
import RoomForm from "@/components/room/RoomForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function CreateRoomPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Layout title="Create Room" user={user}>
      <RoomForm />
    </Layout>
  );
}
