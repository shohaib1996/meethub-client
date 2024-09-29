import React, { useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllRoomsQuery } from "../../../redux/features/room/room.api";
import Spinner from "../../../utils/spinner/Spinner";
import { useDeleteRoomMutation } from "../../../redux/features/roomManagement/roomManagement.api";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks/hooks";
import UpdateModal from "../../../components/updateModal/UpdateModal";

interface RoomType {
  key: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  image: string
}

const RoomList: React.FC = () => {
  const { data, isLoading, refetch } = useGetAllRoomsQuery(undefined);
  const [deleteRoom] = useDeleteRoomMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const token = useAppSelector((state) => state.auth.token);

  // Function to handle deletion
  const handleDelete = (id: string) => {
    const deleteInfo = {
      token,
      id,
    };
    Modal.confirm({
      title: "Are you sure you want to delete this room?",
      onOk: async () => {
        try {
          await deleteRoom(deleteInfo).unwrap(); // Ensure deleteRoom mutation is properly executed
          toast.success("Room deleted successfully!");
          refetch(); // Refetch the room list after deletion
        } catch (error) {
          toast.error("Failed to delete the room.");
        }
      },
    });
  };
  const showModal = (room: RoomType) => {
    console.log(room);
    
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  // Define columns for the room table
  const columns: ColumnsType<RoomType> = [
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Floor No.",
      dataIndex: "floorNo",
      key: "floorNo",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      key: "pricePerSlot",
      render: (price) => `$${price}`,
    },
    {
      title: "Amenities",
      key: "amenities",
      dataIndex: "amenities",
      render: (amenities) => (
        <>
          {amenities.map((amenity: string) => (
            <Tag color="blue" key={amenity}>
              {amenity.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Transform the room data for table
  const roomData: RoomType[] =
    data?.data?.map((room: any) => ({
      key: room._id,
      name: room.name,
      roomNo: room.roomNo,
      floorNo: room.floorNo,
      capacity: room.capacity,
      pricePerSlot: room.pricePerSlot,
      amenities: room.amenities || [],
      image: room.image 
    })) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Table<RoomType>
        columns={columns}
        dataSource={roomData}
        pagination={false}
      />
      <UpdateModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedRoom={selectedRoom ? {
            key: selectedRoom.key,
            name: selectedRoom.name,
            roomNo: selectedRoom.roomNo,
            floorNo: selectedRoom.floorNo,
            capacity: selectedRoom.capacity,
            pricePerSlot: selectedRoom.pricePerSlot,
            image: selectedRoom.image,
            amenities: selectedRoom.amenities,
          } : null}
        refetch={refetch}
      ></UpdateModal>
    </>
  );
};

export default RoomList;
