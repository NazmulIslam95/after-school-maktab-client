import { FaArrowDownLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const HomeBanner = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-serif">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/fVwXd7gR/cordoba-182842.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Banner Content */}
      <div className="absolute inset-0 z-10 mt-32 flex items-center justify-center px-4">
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center text-white">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-xs md:text-xl font-bold">
              <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                  500,
                  "We Ensure Islamic Values", // initially rendered starting point
                  1000,
                  "We Ensure Classified Scholars",
                ]}
                speed={25}
                style={{ fontSize: "2em" }}
                repeat={Infinity}
              />
            </h1>
            <p className="text-sm md:text-xl">
              After School Maktab is an ISO certified educational institution of
              international standards Teaching Online Since 2003
            </p>
            <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
              Explore Courses
            </button>
          </div>

          <div className="hidden md:block absolute bottom-0 right-0 w-48 h-48 md:w-xl md:h-80 bg-[#ffb606] rounded-tr-[60px] md:rounded-tl-full md:rounded-bl-full z-0" />
          {/* Right Visual Section */}
          <div className="md:w-1/2 relative flex justify-center mt-12 md:mt-48">
            {/* Yellow Box in Bottom Left */}

            {/* Student Image overlapping box */}
            <div className="hidden md:block relative -mt-24 md:-mt-32 z-10">
              <img
                src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/hero-img-3.jpg"
                alt="Students"
                className="w-40 md:w-xl rounded-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#next-section"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-2xl text-yellow-400 transition z-20"
      >
        <FaArrowDownLong />
      </a>
    </div>
  );
};

export default HomeBanner;
