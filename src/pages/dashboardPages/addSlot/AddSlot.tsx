import { useGetAllRoomsQuery } from "../../../redux/features/room/room.api";
import { useCreateSlotMutation } from "../../../redux/features/slotManagement/slotManagement.api";
import { useAppSelector } from "../../../redux/hooks/hooks";
import Spinner from "../../../utils/spinner/Spinner";
import { Form, Button, Select, DatePicker, TimePicker } from "antd";
import { toast } from "sonner";

const { Option } = Select;

const AddSlot = () => {
  const { data, isLoading } = useGetAllRoomsQuery(undefined);
  const [addSlot, { isLoading: isAdding }] = useCreateSlotMutation();
  const [form] = Form.useForm();
  const token = useAppSelector((state) => state.auth.token);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const rooms = data?.data || []; // Array of rooms

  const handleCreateSlot = async (values: any) => {
    const { roomId, date, startTime, endTime } = values;

    const formattedDate = date.format("YYYY-MM-DD");
    const formattedStartTime = startTime.format("HH:mm");
    const formattedEndTime = endTime.format("HH:mm");

    const createBody = {
      room: roomId,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
    const addSlotInfo = {
      createBody,
      token,
    };

    try {
      await addSlot(addSlotInfo).unwrap();
      toast.success("Slot created successfully!");
      form.resetFields();
    } catch (error) {
      toast.error("Failed to create slot.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Add Slot</h2>
      <Form form={form} layout="vertical" onFinish={handleCreateSlot}>
        <Form.Item
          label="Select Room"
          name="roomId"
          rules={[{ required: true, message: "Please select a room" }]}
        >
          <Select placeholder="Select a room">
            {rooms.map((room: any) => (
              <Option key={room._id} value={room._id}>
                {room.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select a start time" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select an end time" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isAdding}
            className="w-full"
          >
            Add Slot
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSlot;
