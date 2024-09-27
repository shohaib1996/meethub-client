import { useParams } from "react-router-dom";
import Container from "../../utils/container/Container";
import { Button, DatePicker, DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import { TSlot } from "../../types/slot.type";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks/hooks";

const BookingPage = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slotsByRoom, setSlotsByRoom] = useState<TSlot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure the selectedDate is set before making the request
        if (selectedDate) {
          const res = await axios.get(
            `http://localhost:5000/api/slots/availability?date=${selectedDate}&roomId=${id}`
          );

          setSlotsByRoom(res.data.data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message); // Log the error message
        }
        setSlotsByRoom([]); // Clear the slots in case of an error
      }
    };

    fetchData();
  }, [selectedDate, id]);

  // Handle date selection
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
    setSelectedDate(`${dateString}`); // Store the date string directly
  };

  console.log("Slots by room:", slotsByRoom);

  return (
    <Container>
      <div className="min-h-screen">
        <h1 className="lg:text-5xl text-2xl text-center font-bold my-10">
          Book the room
        </h1>
        <div className="my-8 flex justify-center items-center">
          <div className="flex-1">
            <p className="text-3xl mb-5">Select booking date</p>
            <DatePicker onChange={onChange} style={{ width: 300 }} />
            <p className="text-3xl mt-5 mb-5">Available time slots</p>
            {slotsByRoom && slotsByRoom.length > 0 ? (
              <div>
                {slotsByRoom.map((slot: TSlot) => (
                  <li key={slot._id} className="font-bold">
                    {slot.startTime} - {slot.endTime}
                  </li>
                ))}
              </div>
            ) : (
              <p>No slots available for this date</p>
            )}
          </div>
          <div className="flex-1 bg-blue-200 rounded-lg p-5">
            <h1 className="text-center font-bold text-3xl">Your Info</h1>
            <p>Name: {user?.name}</p>
            <p>Phone: {user?.phone}</p>
            <p>Email: {user?.email} </p>
            <p>Address: {user?.address}</p>
            <Button style={{ marginTop: 20 }} type="primary" block>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookingPage;
