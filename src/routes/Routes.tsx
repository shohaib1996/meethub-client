import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ContactUs from "../pages/contact-us/ContactUs";
import AboutUs from "../pages/about-us/AboutUs";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MeetingRooms from "../pages/meeting-rooms/MeetingRooms";
import SingleRoom from "../components/singleRoom/SingleRoom";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import MyBookings from "../pages/myBookings/MyBookings";
import BookingPage from "../components/bookingPage/BookingPage";
import CheckOutPage from "../components/checkOut/CheckOutPage";
import DashBoard from "../layout/dashBoard/DashBoard";
import RoomList from "../pages/dashboardPages/roomList/RoomList";
import SlotList from "../pages/dashboardPages/slotList/SlotList";
import AddRoom from "../pages/dashboardPages/addRoom/AddRoom";
import BookingList from "../pages/dashboardPages/bookingList/BookingList";
import AddSlot from "../pages/dashboardPages/addSlot/AddSlot";
import DashboardPage from "../components/dashboardPage/DashboardPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "meeting-rooms",
        element: <MeetingRooms></MeetingRooms>,
      },
      {
        path: "room/:id",
        element: (
          <PrivateRoute role={["user"]}>
            <SingleRoom />
          </PrivateRoute>
        ),
      },
      {
        path: "book/:id",
        element: (
          <PrivateRoute role={["user"]}>
            <BookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute role={["user"]}>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute role={["user"]}>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute role={["admin"]}>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <DashboardPage /> },
      {
        path: "rooms",
        element: (
          <PrivateRoute role={["admin"]}>
            <RoomList />
          </PrivateRoute>
        ),
      },
      {
        path: "add-room",
        element: (
          <PrivateRoute role={["admin"]}>
            <AddRoom />
          </PrivateRoute>
        ),
      },
      {
        path: "slots",
        element: (
          <PrivateRoute role={["admin"]}>
            <SlotList />
          </PrivateRoute>
        ),
      },
      {
        path: "add-slot",
        element: (
          <PrivateRoute role={["admin"]}>
            <AddSlot />
          </PrivateRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute role={["admin"]}>
            <BookingList />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);
