import { useEffect } from "react";
import { Modal, Form, Button, TimePicker, DatePicker } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useUpdateSlotMutation } from "../../redux/features/slotManagement/slotManagement.api";
import { Slot } from "../../pages/dashboardPages/slotList/SlotList";
import { toast } from "sonner";

type TUpdateData = {
  date: string;
  startTime: string;
  endTime: string;
};

interface UpdateModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  selectedSlot?: Slot | null;
  refetch: () => void;
}

const UpdateSlot = ({
  setIsModalVisible,
  selectedSlot,
  isModalVisible,
  refetch,
}: UpdateModalProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const [updateSlot, { isLoading }] = useUpdateSlotMutation();

  const [form] = Form.useForm();

  // Use effect to reset form values when selectedSlot changes
  useEffect(() => {
    if (selectedSlot) {
      form.setFieldsValue({
        date: dayjs(selectedSlot?.date),
        startTime: dayjs(selectedSlot?.startTime, "HH:mm"),
        endTime: dayjs(selectedSlot?.endTime, "HH:mm"),
      });
    }
  }, [selectedSlot, form]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = async (values: TUpdateData) => {
    const { date, startTime, endTime } = values;

    try {
      const updateBody = {
        date: dayjs(date).format("YYYY-MM-DD"),
        startTime: dayjs(startTime).format("HH:mm"),
        endTime: dayjs(endTime).format("HH:mm"),
      };

      const updateInfo = {
        token,
        updateBody,
        id: selectedSlot?._id,
      };

      await updateSlot(updateInfo).unwrap();

      toast.success("Slot updated successfully!");
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Failed to update slot. Please try again.");
    }
  };

  return (
    <>
      {isModalVisible && (
        <Modal
          title="Update Slot"
          visible={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              loading={isLoading} // Show loading state on the button
            >
              Update
            </Button>,
          ]}
        >
          <Form
            form={form}
            onFinish={handleUpdate}
            layout="vertical"
          >
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[
                { required: true, message: "Please select a start time!" },
              ]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="endTime"
              label="End Time"
              rules={[
                { required: true, message: "Please select an end time!" },
              ]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default UpdateSlot;
