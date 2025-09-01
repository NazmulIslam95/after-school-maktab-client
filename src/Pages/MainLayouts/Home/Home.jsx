import Navbar from "../../../Components/Navbar/Navbar";
import HomeBanner from "../../../Components/HomeBanner/HomeBanner";
import IntroSec from "./IntroSec";
import Footer from "../../../Components/Footer/Footer";
import ChooseUs from "./ChooseUs";
import OurTutors from "./OurTutors";
import { Trefoil } from "ldrs/react";
import Testimonials from "../../../Components/Testimonials/Testimonials";
import useAuth from "../../../CustomHooks/useAuth";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Trefoil
          size="100"
          stroke="2"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color="black"
        />
      </div>
    );
  }
  return (
    <div className="min-h-[200vh]">
      <Navbar />
      <HomeBanner />
      <IntroSec />
      <OurTutors />
      <ChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
