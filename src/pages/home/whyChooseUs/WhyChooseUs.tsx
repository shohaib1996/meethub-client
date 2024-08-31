import { Card, Col, Row } from "antd";
import { FaCheckCircle, FaLock } from "react-icons/fa"; // Icons for features
import Container from "../../../utils/container/Container";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-3xl mb-2" />,
      title: "Seamless Booking Experience",
      description: "Book your rooms effortlessly with our user-friendly platform.",
    },
    {
      icon: <FaLock className="text-3xl mb-2" />,
      title: "Secure Transactions",
      description: "Your payment information is safe with our encrypted transactions.",
    },
    // Add more features as needed
  ];

  return (
    <div className="my-16">
      <Container>
        <h1 className="text-center text-4xl font-bold mb-8">Why Choose Us?</h1>
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card hoverable className="shadow-lg text-center">
                {feature.icon}
                <p className="text-2xl font-bold">{feature.title}</p>
                <p>{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
