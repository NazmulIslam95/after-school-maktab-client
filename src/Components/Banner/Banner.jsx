import { FaArrowDownLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="relative h-96 w-full overflow-hidden font-serif">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/fVwXd7gR/cordoba-182842.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-75" />

      {/* Banner Content */}
      <div className="absolute inset-0 z-10 mt-32 flex items-center justify-center px-4">
        
      </div>
    </div>
  );
};

export default Banner;
