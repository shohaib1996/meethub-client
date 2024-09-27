import { TRoom } from "./room.type";


// Define the type for the slot object
export type TSlot = {
  _id: string;
  room: TRoom;
  date: string; // "2024-09-29" - this can be a string, or you could use `Date` if you plan to convert it
  startTime: string; // "09:00" - these can remain strings to represent times
  endTime: string; // "10:00"
  isBooked: boolean;
};
