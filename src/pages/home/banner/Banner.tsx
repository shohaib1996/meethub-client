import meeting from "../../../assets/meeting.mp4";
import Container from "../../../utils/container/Container";

const Banner = () => {
  return (
    <div className="mt-5">
      <Container>
        <div className="relative">
          <video
            className="h-[90vh] w-full object-cover rounded-lg"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={meeting} type="video/mp4" />
          </video>
          <div className="absolute top-0 bg-black bg-opacity-25 w-full h-full rounded-lg"></div>
          <div className="absolute top-1/3 left-[15%] text-center space-y-4">
            <h1 className="lg:text-5xl text-xl text-white font-bold ">Book Your Ideal Meeting Room with Ease.</h1>
            <p className="text-md text-slate-200 font-semibold">Efficient, hassle-free room booking for all your meeting needs.</p>
            <button className="btn">Book Now</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
