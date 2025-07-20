import Banner from "../../../Components/Banner/Banner";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import Courses from "../Home/Courses";
import { Link } from 'react-router-dom';


const AllCourses = () => {
  return (
    <div>
      <Navbar />
      {/* <Banner /> */}
      <div className="relative h-96 w-full overflow-hidden font-serif">
      {/* Background Image */}
      <img
        src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/footer-img.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-85" />

      {/* Banner Content */}
      <div className="absolute inset-0 z-10 mt-32 flex flex-col items-center justify-center px-4 text-white font-serif">
        <h1 className="text-5xl mb-4">Our All Courses</h1>
        <p><Link className="hover:text-green-800" to="/">Home</Link> <Link className="text-green-800"> {">"} All Courses</Link></p>
      </div>
    </div>
      <Courses />
      <Footer />    
    </div>
  );
};

export default AllCourses;
