import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../utils/container/Container";
import Lottie from "lottie-react";
import loging from "../../assets/login.json";
import { useLoginMutation } from "../../redux/features/user/user.api";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken/verifyToken";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setUser } from "../../redux/features/user/authSlice";


interface ApiError {
  data?: {
    errorMessages?: { message: string }[];
  };
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [userLogin] = useLoginMutation();
  const onFinish = async (values: any) => {
    const toastId = toast.loading("Loading for Login");

    try {
      const res = await userLogin(values).unwrap();

      if (res?.success === true) {
        const user = verifyToken(res?.token);
        console.log("user", user);
        //* set user & token to local state
        dispatch(setUser({ user: user, token: res?.token }));
        toast.success("Login Successful", { id: toastId, duration: 2000 });
        navigate("/");
      }
    } catch (err) {
      const typedErr = err as ApiError;
      const errorMessage =
        typedErr.data?.errorMessages?.[0]?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
      // console.log(err);
    }
  };
  return (
    <Container>
      <Flex className="mt-12" justify="space-between" align="center">
        <Flex className="w-[45%]">
          <Lottie animationData={loging} loop={true} width={400} height={400} />
        </Flex>
        <Flex className="w-[45%]" style={{ flexDirection: "column" }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            LOGIN
          </Typography.Title>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "100%", marginTop: "40px" }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
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
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Login;
