import { Button, Card, Col, Flex, Row, Select } from "antd";
import { useGetAllRoomsQuery } from "../../redux/features/room/room.api";
import Container from "../../utils/container/Container";
import Spinner from "../../utils/spinner/Spinner";
import { TRoom } from "../../types/room.type";

import Meta from "antd/es/card/Meta";

import Input, { SearchProps } from "antd/es/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import useDebounce from "../../redux/hooks/useDeounce/useDebounce";

const MeetingRooms = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCapacityRange, setSelectedCapacityRange] =
    useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  const [sortOption, setSortOption] = useState<string>("");
  const debounceSearch = useDebounce(searchQuery, 1000);
  const queryParameter = {
    searchQuery: debounceSearch,
    selectedCapacityRange,
    selectedPriceRange,
    sortOption,
  };
  const { Search } = Input;
  const {
    data: getAllRooms,
    error,
    isLoading,
  } = useGetAllRoomsQuery(queryParameter);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center font-bold my-12 text-4xl min-h-screen">No rooms found.</p>
  }

  const onSearch: SearchProps["onSearch"] = (value, _e) =>
    setSearchQuery(value);

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
    const minPrice = value.split("-")[0];
    const maxPrice = value.split("-")[1];

    setSelectedPriceRange(`minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };
  const handleCapacity = (value: string) => {
    // console.log(`selected ${value}`);
    const minCapacity = value.split("-")[0];
    const maxCapacity = value.split("-")[1];

    setSelectedCapacityRange(
      `minCapacity=${minCapacity}&maxCapacity=${maxCapacity}`
    );
  };
  const handleSortByPrice = (value: string) => {
    setSortOption(`sortByPrice=${value}`);
  };
  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedCapacityRange("");
    setSelectedPriceRange("");
    setSortOption("");
  };

  return (
    <div>
      <Container>
        <div className="flex justify-center gap-5">
          <div className="flex-1 mt-16 mb-5 bg-blue-200 p-5 rounded-md">
            <h1 className="text-3xl font-bold text-center my-5">Filter By</h1>
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: "100%" }}
            />
            <Select
              placeholder="Slect by price range"
              style={{ width: "100%", marginTop: "20px" }}
              onChange={handleChange}
              options={[
                { value: "50-100", label: "$50-$100" },
                { value: "101-150", label: "$101-$150" },
                { value: "151-200", label: "$151-$200" },
              ]}
            />
            <Select
              placeholder="Slect by Capacity"
              style={{ width: "100%", marginTop: "20px" }}
              onChange={handleCapacity}
              options={[
                { value: "10-50", label: "10-50" },
                { value: "51-100", label: "51-100" },
                { value: "101-200", label: "101-200" },
              ]}
            />
            <Select
              placeholder="Slect by price"
              style={{ width: "100%", marginTop: "20px" }}
              onChange={handleSortByPrice}
              options={[
                { value: "asc", label: "Price: Low to High" },
                { value: "desc", label: "Price: High to Low" },
              ]}
            />
            <Button
              style={{ marginTop: 20, width: "100%" }}
              type="primary"
              block
              onClick={handleResetFilter}
            >
              Reset Filter
            </Button>
          </div>
          <Row
            gutter={[16, 16]}
            align="middle"
            className="mt-16 mb-5 grid lg:grid-cols-3 grid-cols-1 justify-items-center lg:justify-items-start flex-[3]"
          >
            {getAllRooms?.data && getAllRooms.data.length > 0 ? (
              getAllRooms.data.map((room: TRoom) => (
                <Col key={room._id} xs={24} md={6}>
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={
                      <img
                        alt={room.name}
                        src={room.image}
                        className="h-[300px] object-cover"
                      />
                    }
                  >
                    <Meta title={room.name} />
                    <p>Capacity: {room.capacity}</p>
                    <p>Price Per Slot: ${room.pricePerSlot}</p>
                    <Flex justify="end">
                      <Link to={`/room/${room._id}`}>
                        <Button>See Details</Button>
                      </Link>
                    </Flex>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center font-bold my-12">No rooms found.</p>
            )}
          </Row>
        </div>
        <ScrollToTop></ScrollToTop>
      </Container>
    </div>
  );
};

export default MeetingRooms;
