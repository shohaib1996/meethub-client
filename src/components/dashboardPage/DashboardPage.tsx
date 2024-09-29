import Lottie from "lottie-react";
import welcome from "../../assets/welcome.json";

const DashboardPage = () => {
  return (
    <div className="max-w-xl mx-auto">
      <Lottie animationData={welcome} loop={true} width={500} height={500} />
      <p className="text-center text-5xl font-bold">Welcome to admin dashboard</p>
    </div>
  );
};

export default DashboardPage;
