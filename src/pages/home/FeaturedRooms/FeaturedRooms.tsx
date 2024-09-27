import { Button, Card, Col, Flex, Grid, Row } from "antd";
import { useGetAllRoomsQuery } from "../../../redux/features/room/room.api";
import Container from "../../../utils/container/Container";
import Spinner from "../../../utils/spinner/Spinner";
import Meta from "antd/es/card/Meta";
import { TRoom } from "../../../types/room.type";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const { useBreakpoint } = Grid;

const FeaturedRooms = () => {
  const screens = useBreakpoint();
  const {
    data: getAllRooms,
    error,
    isLoading,
  } = useGetAllRoomsQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error loading rooms.</p>;
  }

  return (
    <div>
      <Container>
        <h1 className="lg:text-5xl font-bold text-3xl text-center lg:text-start">
          Featured Rooms
        </h1>
        <Row
          gutter={[16, 16]}
          align="middle"
          className="mt-16 mb-5 grid lg:grid-cols-4 grid-cols-1 justify-items-center lg:justify-items-start"
        >
          {getAllRooms?.data.slice(0, 8).map((room: TRoom) => (
            <Col key={room._id} xs={24} md={6}>
              <Card
                hoverable
                style={{ width: 310 }}
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
                  <Link to={`/room/${room?._id}`}>
                    <Button>See Details</Button>
                  </Link>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
        <Flex
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: screens.xs ? "center" : "flex-end", // center on small screens, end on larger screens
            flexWrap: "wrap",
            gap: "10px", // Adjust the gap if needed
          }}
          wrap
        >
          <Link to="/meeting-rooms">
            <Button className="shadow-none" size="large">
              See More <FaArrowRightLong></FaArrowRightLong>
            </Button>
          </Link>
        </Flex>
      </Container>
    </div>
  );
};

export default FeaturedRooms;
