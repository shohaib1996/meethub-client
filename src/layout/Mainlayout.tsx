import { Outlet } from "react-router-dom";
import Navbar from "../common-components/navbar/Navbar";
import Footer from "../common-components/footer/Footer";

const Mainlayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
