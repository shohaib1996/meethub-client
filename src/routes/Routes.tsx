import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ContactUs from "../pages/contact-us/ContactUs";
import AboutUs from "../pages/about-us/AboutUs";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MeetingRooms from "../pages/meeting-rooms/MeetingRooms";



export const router = createBrowserRouter([
    {
     path: "/",
     element: <App></App>,
     children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "meeting-rooms",
            element: <MeetingRooms></MeetingRooms>
        },
        {
            path: "contact",
            element: <ContactUs></ContactUs>
        },
        {
            path: "about",
            element: <AboutUs></AboutUs>
        },
        {
            path: "login",
            element: <Login></Login>
        },
        {
            path: "register",
            element: <Register></Register>
        }
     ]
    }
])