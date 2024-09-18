import { useState } from "react";
import { Button, message, Steps } from "antd";
import Container from "../../../utils/container/Container";
import "./steps.css"

const steps = [
  {
    title: "Select a Room",
    description: "Choose the perfect room that fits your requirements.",
  },
  {
    title: "Choose Date & Time",
    description: "Pick a suitable date and time for your booking.",
  },
  {
    title: "Confirm Booking",
    description: "Review your selections and confirm the booking details.",
  },
];

const VerticalSteps = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="mb-32">
      <Container>
        <h1 className="text-center text-4xl font-bold mb-12">How It Works</h1>
        <div className="flex justify-center items-center flex-col">
          <div >
            <Steps
              direction="vertical"
              current={current}
              className="custom-steps"
              items={steps.map((step) => ({
                key: step.title,
                title: <span className="text-2xl font-bold">{step.title}</span>, // Increase title font size
                description: (
                  <span className="text-xl">{step.description}</span>
                ), 
              }))}
            />
          </div>

          <div
            style={{
              marginTop: 24,
            }}
          >
            {current < steps.length - 1 && (
              <Button className="shadow-none" onClick={next}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="shadow-none"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                className="shadow-none"
                style={{ margin: "0 8px" }}
                onClick={prev}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VerticalSteps;
