import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import HomeBanner from "../../../Components/HomeBanner/HomeBanner";
import IntroSec from "./IntroSec";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <IntroSec />
      <Footer />
    </div>
  );
};

export default Home;
// This is the Home component for the application.
// It serves as the landing page and displays a simple message.
