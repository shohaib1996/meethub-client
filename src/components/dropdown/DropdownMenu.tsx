import { Dropdown, MenuProps, Space } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Logout } from "../../redux/features/user/authSlice";
import { toast } from "sonner";

const DropdownMenu = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  function handleLogOut() {
    toast.success("Log Out successfully")
    dispatch(Logout());
  }

  const items: MenuProps["items"] = [];

  if (user?.role === "user") {
    items.push({
      key: "1",
      label: (
        <Link to="/my-bookings" target="_blank" rel="noopener noreferrer">
          My Bookings
        </Link>
      ),
    });
  }

  if (user?.role === "admin") {
    items.push({
      key: "2",
      label: (
        <Link to="/dashboard" target="_blank" rel="noopener noreferrer">
          Dashboard
        </Link>
      ),
    });
  }

  // Common Logout option for both user and admin
  items.push({
    key: "3",
    label: (
      <button onClick={handleLogOut} rel="noopener noreferrer">
        Logout
      </button>
    ),
  });
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className="avatar p-2">
            <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
