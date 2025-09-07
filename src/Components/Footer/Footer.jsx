import { FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-2xl shadow-gray-800">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <Link to="/">
            <img
              className="w-12 h-12 md:w-24 md:h-24"
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt="Logo"
            />
          </Link>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <Link
              to="/"
              className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
            >
              About
            </Link>
            <Link
              to="/teachers"
              className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
            >
              Teachers
            </Link>
            <Link
              to="/terms"
              className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
            >
              Terms & Policy
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-6" />

        <div className="max-w-7xl mx-auto flex flex-col items-center sm:flex-row sm:justify-between mb-16 md:mb-0">
          <p className="text-sm text-gray-500">© Copyright 2025.</p>

          <div className="flex -mx-2">
            <Link
              to="#"
              className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
            >
              <FaYoutube></FaYoutube>
            </Link>
            <Link
              to="#"
              className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
              aria-label="Facebook"
            >
              <FaFacebook></FaFacebook>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
