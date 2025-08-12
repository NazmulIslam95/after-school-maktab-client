import Banner from "../../../Components/Banner/Banner";
import Navbar from "../../../Components/Navbar/Navbar";

const OurLibrary = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Banner title="ourLibrary.title" subTitle="ourLibrary.subTitle" />
    </div>
  );
};

export default OurLibrary;
