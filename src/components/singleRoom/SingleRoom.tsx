import { Link, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/room/room.api";
import Spinner from "../../utils/spinner/Spinner";
import { useState } from "react";

const SingleRoom = () => {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading } = useGetSingleRoomQuery(id);
  const [selectedImage, setSelectedImage] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const {_id, image, amenities, pricePerSlot, floorNo, roomNo, name, capacity } =
    data.data;
  if (!selectedImage) {
    setSelectedImage(image);
  }

  // Function to change the selected image
  const changeImage = (newImage: string) => {
    setSelectedImage(newImage);
  };

  return (
    <div>
      <div className="mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-[400px] rounded-lg shadow-md mb-4"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                <img
                  src={image}
                  className="size-16 w-full h-[400px] sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(image)}
                />
                <img
                  src="https://img.freepik.com/free-vector/front-view-long-table-office-video-conferencing-background_52683-44003.jpg?w=1480&t=st=1727460537~exp=1727461137~hmac=b9e5ff5eda7c4ecdca9cf315ae5470533fe5784299d19b5b87e400be0ec25985"
                  alt="Thumbnail 2"
                  className="size-16 w-full h-[400px] sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() =>
                    changeImage(
                      "https://img.freepik.com/free-vector/front-view-long-table-office-video-conferencing-background_52683-44003.jpg?w=1480&t=st=1727460537~exp=1727461137~hmac=b9e5ff5eda7c4ecdca9cf315ae5470533fe5784299d19b5b87e400be0ec25985"
                    )
                  }
                />
                <img
                  src="https://img.freepik.com/free-photo/luxury-nightclub-features-modern-decor-lighting-equipment-generated-by-ai_188544-45394.jpg?t=st=1727460733~exp=1727464333~hmac=a5948f2adbd065e74da0e771aa570850705a90ae9a4c0a36db5a1a21427f6c97&w=1800"
                  className="size-16 w-full h-[400px] sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() =>
                    changeImage(
                      "https://img.freepik.com/free-photo/luxury-nightclub-features-modern-decor-lighting-equipment-generated-by-ai_188544-45394.jpg?t=st=1727460733~exp=1727464333~hmac=a5948f2adbd065e74da0e771aa570850705a90ae9a4c0a36db5a1a21427f6c97&w=1800"
                    )
                  }
                />
              </div>
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{name}</h2>
              <p className="text-gray-600 mb-4">Room No: {roomNo}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">${pricePerSlot}</span>
                {/* <span className="text-gray-500 line-through">$399.99</span> */}
              </div>
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">Floor No: {floorNo}</p>
              <div className="mb-6"></div>
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Capacity: {capacity}
                </label>
              </div>
              <div className="flex space-x-4 mb-6">
                <Link to={`/book/${_id}`}>
                  <button className="bg-blue-500 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Book Now
                  </button>
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Amenities:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {amenities?.map((amenity: String) => (
                    <li>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
