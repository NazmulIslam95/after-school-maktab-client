import Navbar from "../../../Components/Navbar/Navbar";
import HomeBanner from "../../../Components/HomeBanner/HomeBanner";
import IntroSec from "./IntroSec";
import Footer from "../../../Components/Footer/Footer";
import Courses from "./Courses";
import ChooseUs from "./ChooseUs";
import OurTutors from "./OurTutors";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";

const Home = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-[200vh]">
      <Navbar />
      <HomeBanner />
      <IntroSec />
      <OurTutors />
      <ChooseUs></ChooseUs>
      <Footer />
    </div>
  );
};

export default Home;
