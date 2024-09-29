import { Table, Button, Space, Tag, Popconfirm, Modal } from "antd";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/bookingManagement/bookingManagement.api";
import { TUser } from "../../../redux/features/user/authSlice";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { TRoom } from "../../../types/room.type";
import Spinner from "../../../utils/spinner/Spinner";
import { Slot } from "../slotList/SlotList";
import { toast } from "sonner";

interface Booking {
  _id: string;
  room: TRoom;
  slots: Slot[];
  user: TUser;
  date: string;
  totalAmount: number;
  isConfirmed: "unconfirmed" | "confirmed";
  isDeleted: boolean;
}

const BookingList = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { data, isLoading, refetch } = useGetAllBookingsQuery(token);
  const [updateBooking] = useUpdateBookingMutation(); // Mutation to toggle booking status
  const [deleteBooking] = useDeleteBookingMutation(); // Mutation to delete booking

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const bookings: Booking[] = data?.data || [];

  const toggleBookingStatus = async (
    bookingId: string,
    currentStatus: "confirmed" | "unconfirmed"
  ) => {
    // console.log(bookingId);

    try {
      await updateBooking({
        id: bookingId,
        isConfirmed:
          currentStatus === "confirmed" ? "unconfirmed" : "confirmed",
        token,
      }).unwrap();
      toast.success("Booking status updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update booking status.");
    }
  };

  const handleDelete = async (bookingId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteBooking({ bookingId, token }).unwrap(); 
          toast.success("Booking deleted successfully!");
          refetch(); 
        } catch (error) {
          toast.error("Failed to delete booking.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Room Name",
      dataIndex: ["room", "name"],
      key: "roomName",
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "Date & Time",
      key: "dateTime",
      render: (record: Booking) => (
        <>
          {record.slots.map((slot) => (
            <div key={slot._id}>
              {`${slot.date} ${slot.startTime} - ${slot.endTime}`}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record: Booking) => (
        <Tag color={record.isConfirmed === "confirmed" ? "green" : "red"}>
          {record.isConfirmed === "confirmed" ? "Confirmed" : "Unconfirmed"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Booking) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => toggleBookingStatus(record._id, record.isConfirmed)}
          >
            {record.isConfirmed === "confirmed" ? "Unconfirm" : "Confirm"}
          </Button>

          {/* Delete Button with confirmation */}
          <Popconfirm
            title="Are you sure you want to delete this booking?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={bookings}
      rowKey={(record) => record._id}
      pagination={false}
    />
  );
};

export default BookingList;
