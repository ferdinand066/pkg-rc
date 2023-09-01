import { RoomFormProps } from "@/components/room/RoomForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const getRooms = async () => {
  const { data } = await supabase.from("rooms").select();
  return data;
}

const createRoom = async (data: RoomFormProps) => {
  const { error } = await supabase.from("rooms").insert(data);
  return error?.message;
};

export { getRooms, createRoom };
