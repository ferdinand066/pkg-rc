type Booking = {
  id: string,
  room_id: string,
  booking_start: string,
  booking_end: string,
  booked_by: string,
  booking_date: Date,
  accepted_by: string,
  created_at: Date,
  rooms?: Room,
}

export default Booking;