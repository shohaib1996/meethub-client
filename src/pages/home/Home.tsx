import Navbar from "../../common-components/navbar/Navbar"
import Advertisement from "./advertisement/Advertisement"
import Banner from "./banner/Banner"
import FeaturedRooms from "./FeaturedRooms/FeaturedRooms"
import WhyChooseUs from "./whyChooseUs/WhyChooseUs"


const Home = () => {
  return (
    <>
    <Navbar></Navbar>
    <Banner></Banner>
    <Advertisement></Advertisement>
    <FeaturedRooms></FeaturedRooms>
    <WhyChooseUs></WhyChooseUs>
    </>
  )
}

export default Home