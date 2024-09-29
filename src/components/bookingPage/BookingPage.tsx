import { Link, useParams } from "react-router-dom";
import Container from "../../utils/container/Container";
import { Button, Checkbox, DatePicker, DatePickerProps } from "antd";
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
  const [selectedSlots, setSelectedSlots] = useState<
  { slotId: string; startTime: string; endTime: string }[]
>([]);

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

  const onChangeCheckBox = (
    checked: boolean,
    slotId: string,
    startTime: string,
    endTime: string
  ) => {
    setSelectedSlots((prevSelectedSlots) => {
      if (checked) {
        console.log(startTime, endTime);

        // Add the slot details if it's checked
        return [...prevSelectedSlots, { slotId, startTime, endTime }];
      } else {
        // Remove the slot details if it's unchecked
        return prevSelectedSlots.filter((slot) => slot.slotId !== slotId);
      }
    });
  };

  console.log(selectedSlots);

  return (
    <Container>
      <div className="min-h-screen">
        <h1 className="lg:text-5xl text-2xl text-center font-bold my-10">
          Book the room
        </h1>
        <div className="my-8 flex justify-center items-center">
          <div className="flex-1">
            <p className="text-2xl mb-3">Select booking date</p>
            <DatePicker onChange={onChange} style={{ width: 300 }} />
            <p className="text-2xl mt-5 mb-3">Available time slots</p>
            {slotsByRoom && slotsByRoom.length > 0 ? (
              <div>
                {slotsByRoom.map((slot: TSlot) => (
                  <li key={slot._id} className="font-bold list-none">
                    <Checkbox
                      onChange={(e) =>
                        onChangeCheckBox(e.target.checked, slot._id, slot.startTime, slot.endTime)
                      }
                    >
                      {slot.startTime} - {slot.endTime}
                    </Checkbox>
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
            <Link
              to="/checkout"
              state={{
                roomId: id,
                selectedDate,
                selectedSlots,
              }}
            >
              <Button
                disabled={selectedSlots.length === 0}
                style={{ marginTop: 20 }}
                type="primary"
                block
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookingPage;
