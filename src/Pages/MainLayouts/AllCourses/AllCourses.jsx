import Banner from "../../../Components/Banner/Banner";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import Courses from "../Home/Courses";

const AllCourses = () => {
  return (
    <div>
      <Navbar />
      <Banner title="Our All Courses" subTitle="Our All Courses"/>
      <Courses />
      <Footer />
    </div>
  );
};

export default AllCourses;
