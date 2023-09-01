import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const getRooms = async () => {
  const { data } = await supabase.from("rooms").select();
  return data;
}

export { getRooms };
