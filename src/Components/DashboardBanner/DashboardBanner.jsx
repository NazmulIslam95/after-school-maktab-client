import { Link } from "react-router-dom";

const DashboardBanner = ({ title, subTitle }) => {
  return (
    <div className="w-full overflow-hidden philosopher-regular">
      {/* Banner Content */}
      <div className=" flex flex-col items-center justify-center px-4 text-black ">
        <h1 className="text-2xl md:text-5xl mb-4">{title}</h1>
        <p className="text-sm md:text-base mb-4">
          <Link className="hover:text-green-800" to="/">
            Home
          </Link>{" "}
          <span className=" text-green-800">
            {" "}
            {">"} {subTitle}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DashboardBanner;
