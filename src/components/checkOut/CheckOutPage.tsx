import { useLocation, useNavigate } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useGetSingleRoomQuery } from "../../redux/features/room/room.api";
import Container from "../../utils/container/Container";
import { Button, Modal } from "antd";
import { useState } from "react";
import Lottie from "lottie-react";
import successfully from "../../assets/successfully.json";
import { useCreateBookingMutation } from "../../redux/features/booking/bookig.api";

type TSelectTime = {
  slotId: string;
  startTime: string;
  endTime: string;
};

const CheckOutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navitage = useNavigate()
  const location = useLocation();
  const [addBooking] = useCreateBookingMutation();
  const user = useAppSelector((state) => state.auth.user);
  const email = user?.email;
  console.log(email);
  const userEmail = { email: email };

  const { data } = useGetSingleUserQuery(userEmail, { skip: !email });
  const { roomId, selectedDate, selectedSlots } = location.state;

  const { data: singleRoom, isLoading } = useGetSingleRoomQuery(roomId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { name, pricePerSlot, roomNo, image } = singleRoom.data;

  console.log(data);

  const handleBooking = async () => {
    const bookingInfo = {
      date: selectedDate,
      slots: selectedSlots?.map((slot: TSelectTime) => slot.slotId),
      room: roomId,
      user: data?.data?._id,
    };
    try {
      const res = await addBooking(bookingInfo);
      console.log(res);
      if (res && res?.data?.success == true) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  const handleOk = () => {
    setIsModalOpen(false);
    navitage("/meeting-rooms")
  };
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };

  return (
    <Container>
      <div className="min-h-screen">
        {/* <h1>CheckOutPage</h1>
      <p>Room ID: {roomId}</p>
      <p>Date: {selectedDate}</p>
      <p>Selected Slots: {selectedSlotIds.join(", ")}</p> */}
        <h1 className="text-center text-4xl font-bold my-12">
          Booking Confirmation
        </h1>
        <div className="card lg:card-side bg-base-100">
          <figure>
            <img src={image} alt="Album" />
          </figure>
          <div className="flex flex-col space-y-3 items-center justify-center flex-1">
            <h2 className="card-title text-4xl">{name}</h2>
            <p>Room No: {roomNo}</p>
            <p>Selected Date: {selectedDate}</p>
            <p>Selected Slots Number: {selectedSlots?.length}</p>
            <p>Total Cost: ${pricePerSlot * selectedSlots?.length}</p>
            <ol>
              Selected Time:{" "}
              {selectedSlots?.map((slot: TSelectTime) => (
                <li key={slot.slotId}>
                  {slot.startTime} - {slot.endTime}
                </li>
              ))}
            </ol>
            <div className="card-actions justify-end">
              <Button
                onClick={handleBooking}
                type="primary"
                block
                style={{ width: 280 }}
              >
                Book Confirm
              </Button>
              <Modal
                // title="Booking Confirmation"
                closable={false}
                open={isModalOpen}
                onOk={handleOk}
                cancelButtonProps={{ style: { display: "none" } }}
              >
                <div>
                  <Lottie
                    animationData={successfully}
                    loop={true}
                    width={300}
                    height={300}
                  />
                </div>
                <p className="text-center text-xl font-bold">
                  You have successfully book <br />
                  the meeting room
                </p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckOutPage;
