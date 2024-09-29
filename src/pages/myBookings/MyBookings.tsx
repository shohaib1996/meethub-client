import { Table, TableProps, Tag } from "antd";
import { useGetBookedSlotByUserQuery } from "../../redux/features/booking/bookig.api";
import { useAppSelector } from "../../redux/hooks/hooks";
import Container from "../../utils/container/Container";
import Spinner from "../../utils/spinner/Spinner";

const MyBookings = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { data: slotData, isLoading } = useGetBookedSlotByUserQuery(token);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  console.log(slotData.data);

  interface DataType {
    key: string;
    roomName: string;
    dateTime: string[];
    status: string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text: string[]) => (
        <div>
          {text.map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div>
          {text === "unconfirmed" ? (
            <Tag style={{ color: "red" }}>{text.toUpperCase()}</Tag>
          ) : (
            <Tag style={{ color: "green" }}>{text.toUpperCase()}</Tag>
          )}
        </div>
      ),
    },
  ];

  const data: DataType[] =
    slotData?.data.map((booking: any) => ({
      key: booking._id,
      roomName: booking.room.name,
      dateTime: Array.isArray(booking.slots)
        ? booking.slots.map(
            (slot: any) => `${slot.date}: ${slot.startTime} - ${slot.endTime}`
          )
        : [],
      status: booking.isConfirmed,
    })) || [];

  // console.log("Data=>",data);

  return (
    <Container>
      <div className="min-h-screen">
        {slotData?.data.length > 0 ? (
          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        ) : (
          <p className="text-center text-5xl font-bold">You did not book yet</p>
        )}
      </div>
    </Container>
  );
};

export default MyBookings;
