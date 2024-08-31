import { Card, Col, Row } from "antd";
import Container from "../../../utils/container/Container";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";

const Advertisement = () => {
  return (
    <div className="my-16 p-5 lg:p-0">
      <Container>
        <Row gutter={[16, 16]} className="flex-col md:flex-row ">
          <Col xs={24} md={6}>
            <Card className="bg-yellow-200 shadow-lg">
              <MdAccessTimeFilled className="text-3xl mb-2"></MdAccessTimeFilled>
              <p className="text-2xl font-bold">Real-Time Availability</p>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card className="bg-[#E9EFFC] shadow-lg">
              <BsCheckCircleFill className="text-3xl mb-2"></BsCheckCircleFill>
              <p className="text-2xl font-bold">Instant Booking</p>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card className="bg-[#EBD3C5] shadow-lg">
              <MdEventAvailable className="text-3xl mb-2"></MdEventAvailable>
              <p className="text-2xl font-bold">Flexible Scheduling</p>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card className="bg-[#EAEED6] shadow-lg">
              <MdSupportAgent className="text-3xl mb-2"></MdSupportAgent>
              <p className="text-2xl font-bold">24/7 Support</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Advertisement;
