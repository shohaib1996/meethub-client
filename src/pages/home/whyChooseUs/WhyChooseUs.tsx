import { Flex } from "antd";
import Container from "../../../utils/container/Container";

import seamless from "../../../assets/seamless-booking.json";
import payment from "../../../assets/secure-transaction.json";
import Lottie from "lottie-react";
import { FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="my-16">
      <Container>
        <h1 className="text-center text-4xl font-bold mb-8">Why Choose Us?</h1>
        <Flex className="flex-col lg:flex-row gap-4 lg:gap-middle items-center justify-around">
          <div>
            <h1 className="text-xl lg:text-3xl font-bold mb-10 text-center lg:text-start">
              Seamless Booking Experience
            </h1>
            <ul
              className="space-y-4"
              style={{ listStyleType: "none", paddingLeft: 0 }}
            >
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                Quick and easy reservations
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                Real-time availability updates
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                Secure payment options
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                24/7 customer support
              </li>
            </ul>
          </div>

          <div>
            <Lottie
              animationData={seamless}
              loop={true}
              width={500}
              height={500}
            />
          </div>
        </Flex>
        <Flex className="flex-col-reverse lg:flex-row gap-4 lg:gap-middle items-center justify-around mt-32">
          <div>
            <Lottie
              animationData={payment}
              loop={true}
              width={500}
              height={500}
            />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-bold mb-10 text-center lg:text-start">Secure Transactions</h1>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }} className="space-y-4">
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                End-to-end encryption
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                PCI DSS compliance
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                Fraud detection and prevention
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                Multi-factor authentication
              </li>
              <li className="flex items-center text-2xl">
                <FaCheckCircle
                  style={{ color: "green", marginRight: "10px" }}
                />
                Secure payment gateways
              </li>
            </ul>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
