import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../utils/container/Container";
import Lottie from "lottie-react";
import signup from "../../assets/signup.json";
import {TUserInfo } from "../../types/user.type";
import { useRegisterMutation } from "../../redux/features/user/user.api";
import { toast } from "sonner";

interface ApiError {
  data?: {
    errorMessages?: { message: string }[];
  };
}

const Register = () => {
  const navigate = useNavigate();
  const [addUser] =useRegisterMutation()
  const onFinish = async(values: TUserInfo) => {
    const userInfo = {
      ...values,
      role: "user"
    }
    
    const toastId = toast.loading("Loading for Sign up");

    try {
      const res = await addUser(userInfo).unwrap();
      
      if (res?.success === true) {
        toast.success("Sign up Successful", { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (err) {
      const typedErr = err as ApiError;
      const errorMessage = typedErr.data?.errorMessages?.[0]?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
      // console.log(err);
    }
  };
  return (
    <Container>
      <Flex className="mt-12" justify="center" align="center">
        <Flex className="w-[45%]">
          <Lottie animationData={signup} loop={true} width={400} height={400} />
        </Flex>
        <Flex className="w-[45%]" style={{ flexDirection: "column" }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Register
          </Typography.Title>

          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "100%", marginTop: "40px" }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Please input your Phone!" }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="phone" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Address" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
            </Upload> */}

            {/* <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item> */}

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <Link to="/login">Already have an account</Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Register;
