import Advertisement from "./advertisement/Advertisement";
import Banner from "./banner/Banner";
import FeaturedRooms from "./FeaturedRooms/FeaturedRooms";
import VerticalSteps from "./steps/Steps";
import Testimonial from "./testimonial/Testimonial";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <FeaturedRooms></FeaturedRooms>
      <WhyChooseUs></WhyChooseUs>
      <VerticalSteps></VerticalSteps>
      <Testimonial></Testimonial>
    </>
  );
};

export default Home;
