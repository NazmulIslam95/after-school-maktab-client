import Navbar from "../../../Components/Navbar/Navbar";
import HomeBanner from "../../../Components/HomeBanner/HomeBanner";
import IntroSec from "./IntroSec";
import Footer from "../../../Components/Footer/Footer";
import Courses from "./Courses";
import ChooseUs from "./ChooseUs";

const Home = () => {
  return (
    <div className="min-h-[200vh]">
      <Navbar />
      <HomeBanner />
      <IntroSec />
      <Courses />
      <ChooseUs></ChooseUs>
      <Footer />
    </div>
  );
};

export default Home;
