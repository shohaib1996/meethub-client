import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import {
  AppstoreOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <div className="flex items-center justify-center">
            <Link to="/" className="p-2 text-center text-white font-bold text-xl">MeetHub</Link>
          </div>
          <Menu.SubMenu
            key="sub1"
            icon={<AppstoreOutlined />}
            title="Room Management"
          >
            <Menu.Item key="1" onClick={() => navigate("/dashboard/rooms")}>
              Room List
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/dashboard/add-room")}>
              Create Room
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            icon={<SettingOutlined />}
            title="Slots Management"
          >
            <Menu.Item key="3" onClick={() => navigate("/dashboard/slots")}>
              Slot List
            </Menu.Item>
            <Menu.Item key="4" onClick={() => navigate("/dashboard/add-slot")}>
              Create Slot
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub3"
            icon={<UploadOutlined />}
            title="Booking Management"
          >
            <Menu.Item key="5" onClick={() => navigate("/dashboard/bookings")}>
              Booking List
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="">
              <Outlet />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
