import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
export interface Testimonial {
  _id: string;
  user_name: string;
  comment: string;
  img: string;
  rating: number;
  profession: string;
}

const TestimonialCards = ({ testimonial }: { testimonial: Testimonial }) => {
  const { user_name, comment, img, rating, profession } = testimonial;
  console.log(testimonial);
  return (
    <div className="space-y-6 px-12 py-5 border-2 border-[#F3F3F3] round">
      <div className="flex justify-between items-center flex-col lg:flex-row">
        <div className="flex item-center gap-5">
          <div className="">
            <img className="h-14 w-14 rounded-full" src={img} alt="" />
          </div>
          <div>
            <p className="text-[#444] text-xl font-bold">{user_name}</p>
            <p className="text-[#737373]">{profession}</p>
          </div>
        </div>
        <div>
          <img
            className="w-14 h-14"
            src="https://www.svgrepo.com/show/36166/left-quote.svg"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[#737373] h-[290px] lg:h-[150px] mb-5">{comment}</p>
        <p>
          <Rating
            style={{ maxWidth: 100 }}
            readOnly
            halfFillMode="svg"
            value={rating}
          />
        </p>
      </div>
    </div>
  );
};

export default TestimonialCards;