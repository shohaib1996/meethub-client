import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import TestimonialCards from "./testimonialCards/TestimonialCards";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "antd";

interface Testimonial {
  _id: string;
  user_name: string;
  comment: string;
  img: string;
  rating: number;
  profession: string;
}

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    fetch("/testimonial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-10 mb-12 flex justify-center items-center">
        <h2 className="text-xl lg:text-4xl font-bold mt-2">
          What our customer say
        </h2>
      </div>
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 pb-12 mt-12">
          <div className="lg:max-w-7xl max-w-xs mx-auto lg:p-0 relative ">
            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              spaceBetween={40}
              autoplay={{ delay: 1000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }}
              navigation={{
                prevEl: ".custom-swiper-button-prev",
                nextEl: ".custom-swiper-button-next",
              }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <TestimonialCards testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-1 lg:left-3 right-1 lg:right-3 top-1/2 z-10">
              <div className="custom-swiper-button-prev">
                <Button className="shadow-none" shape="circle">
                  <FaArrowLeft></FaArrowLeft>
                </Button>
              </div>
              <div className="custom-swiper-button-next">
                <Button className="shadow-none" shape="circle">
                  <FaArrowRight></FaArrowRight>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
