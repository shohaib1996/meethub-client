import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useUpdateRoomMutation } from "../../redux/features/roomManagement/roomManagement.api";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks/hooks";

type Room = {
  key: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  image: string;
  amenities: string[];
};

interface UpdateModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  selectedRoom: Room | null;
  refetch: () => void;
}

const UpdateModal = ({
  isModalVisible,
  setIsModalVisible,
  selectedRoom,
  refetch,
}: UpdateModalProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const [form] = Form.useForm();
  const [updateRoom] = useUpdateRoomMutation();

  if (selectedRoom) {
    form.setFieldsValue({
      name: selectedRoom.name,
      roomNo: selectedRoom.roomNo,
      floorNo: selectedRoom.floorNo,
      capacity: selectedRoom.capacity,
      pricePerSlot: selectedRoom.pricePerSlot,
      image: selectedRoom.image,
      amenities: selectedRoom.amenities,
    });
  }

  const handleUpdate = async (values: Room) => {
    // console.log(values);

    if (!selectedRoom) {
      toast.error("No room selected for update.");
      return;
    }

    const updateInfo = {
      id: selectedRoom.key,
      token,
      roomData: values,
    };

    try {
      await updateRoom(updateInfo).unwrap();
      toast.success("Room updated successfully!");
      setIsModalVisible(false); // Close the modal after success
      refetch(); // Refetch the room list after the update
    } catch (error) {
      toast.error("Failed to update the room.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Define initial values based on selectedRoom
  const initialValues = selectedRoom
    ? {
        name: selectedRoom.name,
        roomNo: selectedRoom.roomNo,
        floorNo: selectedRoom.floorNo,
        capacity: selectedRoom.capacity,
        pricePerSlot: selectedRoom.pricePerSlot,
        image: selectedRoom.image,
        amenities: selectedRoom.amenities,
      }
    : {
        name: "",
        roomNo: 0,
        floorNo: 0,
        capacity: 0,
        pricePerSlot: 0,
        image: "",
        amenities: [],
      };

  return (
    <Modal
      title="Edit Room"
      visible={isModalVisible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={handleUpdate}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item name="name" label="Room Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="roomNo"
          label="Room Number"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="floorNo"
          label="Floor No."
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="amenities"
          label="Amenities"
          rules={[{ required: true, message: "Please select the amenities!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select amenities"
            style={{ width: "100%" }}
          >
            <Select.Option value="WiFi">WiFi</Select.Option>
            <Select.Option value="Projector">Projector</Select.Option>
            <Select.Option value="Whiteboard">Whiteboard</Select.Option>
            <Select.Option value="Air Conditioning">
              Air Conditioning
            </Select.Option>
            <Select.Option value="Parking">Parking</Select.Option>
            <Select.Option value="Audio system">Audio system</Select.Option>
            <Select.Option value="Marker">Marker</Select.Option>
            <Select.Option value="TV Screen">TV Screen</Select.Option>
            <Select.Option value="Coffee Machine">Coffee Machine</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="pricePerSlot"
          label="Price Per Slot"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="image" label="Photo URL" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
