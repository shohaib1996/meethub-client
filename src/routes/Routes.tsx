import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ContactUs from "../pages/contact-us/ContactUs";



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
            path: "contact",
            element: <ContactUs></ContactUs>
        }
     ]
    }
])