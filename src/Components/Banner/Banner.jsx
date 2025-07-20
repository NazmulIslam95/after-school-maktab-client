import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Banner = ({ title, subTitle }) => {
  return (
    <div className="relative h-80 w-full overflow-hidden font-serif">
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
        <h1 className="text-5xl mb-4">{title}</h1>
        <p>
          <Link className="hover:text-green-800" to="/">
            Home
          </Link>{" "}
          <span className="text-green-800">
            {" "}
            {">"} {subTitle}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
