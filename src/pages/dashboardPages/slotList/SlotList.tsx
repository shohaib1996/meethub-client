import { Table, Button, Modal } from "antd";
import { useGetSlotByRoomAndDateQuery } from "../../../redux/features/slot/slot.api";
import Spinner from "../../../utils/spinner/Spinner";
import { useDeleteSlotMutation } from "../../../redux/features/slotManagement/slotManagement.api";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { toast } from "sonner";
import { useState } from "react";
import UpdateSlot from "../../../components/updateSlot/UpdateSlot";

// Define your interfaces here
interface Room {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  image: string;
}

export interface Slot {
  _id: string;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SlotList = () => {
  const { data, isLoading, refetch } = useGetSlotByRoomAndDateQuery(undefined);
  const [deleteRoom] = useDeleteSlotMutation();
  const token = useAppSelector((state) => state.auth.token);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Assuming data.data is the array containing slot information
  const slots: Slot[] = data?.data || []; // Specify the type of slots

  const columns = [
    {
      title: "Room Name",
      dataIndex: "room",
      render: (room: Room) => <span>{room?.name || "N/A"}</span>,
    },
    {
      title: "Room No.",
      dataIndex: "room",
      render: (room: Room) => <span>{room?.roomNo || "N/A"}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date: string) => <span>{date}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (time: string) => <span>{time}</span>,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (time: string) => <span>{time}</span>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (
        id: string,
        record: Slot // Specify the type of record
      ) => (
        <div className="space-x-2">
          <Button type="primary" onClick={() => showModal(record)}>
            Update
          </Button>
          <Button danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const showModal = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const deleteInfo = {
      token,
      id,
    };
    Modal.confirm({
      title: "Are you sure you want to delete this room?",
      onOk: async () => {
        try {
          await deleteRoom(deleteInfo).unwrap();
          toast.success("Room deleted successfully!");
          refetch();
        } catch (error) {
          toast.error("Failed to delete the room.");
        }
      },
    });
  };

  return (
    <div>
      <Table
        dataSource={slots}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
      <UpdateSlot
        refetch={refetch}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedSlot={selectedSlot}
      >
      </UpdateSlot>
    </div>
  );
};

export default SlotList;
