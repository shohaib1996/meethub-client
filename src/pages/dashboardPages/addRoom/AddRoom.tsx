import { Input, InputNumber, Select, Form, Button, Row, Col } from "antd";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateRoomMutation } from "../../../redux/features/roomManagement/roomManagement.api";
const AddRoom = () => {
  const token = useAppSelector((state) => state.auth.token); // Get the token from Redux state
  const [createRoom] = useCreateRoomMutation(); // Get the mutation hook
  const [form] = Form.useForm();

  const handleCreateRoom = async (values: any) => {
    const roomData = {
      name: values.name,
      roomNo: values.roomNo,
      floorNo: values.floorNo,
      capacity: values.capacity,
      amenities: values.amenities,
      pricePerSlot: values.pricePerSlot,
      image: values.image,
    };

    const roomInfo = {
      roomData,
      token,
    };

    try {
      await createRoom(roomInfo).unwrap();
      toast.success("Room added successfully!");
      form.resetFields()
    } catch (error) {
      if ((error as any)?.data?.errorMessages?.[0]?.message) {
        toast.error((error as any).data.errorMessages[0].message);
      } else {
        toast.error("An unexpected error occurred."); 
      }
    }
  };

  return (
    <Form onFinish={handleCreateRoom} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Room Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="roomNo"
            label="Room Number"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="floorNo"
            label="Floor No."
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="amenities"
            label="Amenities"
            rules={[
              { required: true, message: "Please select the amenities!" },
            ]}
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
              <Select.Option value="Coffee Machine">
                Coffee Machine
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="pricePerSlot"
            label="Price Per Slot"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="image"
            label="Photo URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Add Room
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRoom;
