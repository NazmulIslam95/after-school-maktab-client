import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-4 py-12 mx-auto shadow-2xl shadow-[#2e3192] ">
      <div className="md:max-w-6xl mx-auto grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-11 lg:gap-20">
        <div className="col-span-3">
          <Link
            to="/"
            title="Hellonext Home Page"
            className="flex items-center justify-center"
          >
            <img
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt=""
              className="w-24"
            />
          </Link>
          <p className="my-4 text-xs leading-normal text-gray-600">
            Hosted in the EU 🇪🇺, with <strong>no user tracking</strong> scripts.
            Made all over the world by{" "}
            <Link to="#" className="underline" target="_blank" rel="noreferrer">
              17 amazing people
            </Link>
            .
          </p>
        </div>

        <nav className="col-span-1 md:col-span-1 lg:col-span-2">
          <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Product
          </p>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Features
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Pricing
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Feedback
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            FAQs
          </Link>
        </nav>

        <nav className="col-span-2 md:col-span-1 lg:col-span-2">
          <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Support
          </p>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Chat
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Email Support
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            GDPR
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Help
          </Link>
        </nav>

        <nav className="col-span-1 md:col-span-1 lg:col-span-2">
          <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Resources
          </p>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Blog
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Twitter
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Alternatives
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Why feature vote?
          </Link>
        </nav>

        <nav className="col-span-1 md:col-span-1 lg:col-span-2">
          <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Company
          </p>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            About Us
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Privacy
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Terms
          </Link>
          <Link
            className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-[#2e3192]"
            to="#"
          >
            Status
          </Link>
        </nav>
      </div>

      <div className="flex max-w-7xl mx-auto items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center">
        <p className="mb-2 text-xs font-semibold text-left text-gray-600 md:mb-0">
          Developed by{" "}
          <Link
            to="https://nazmul-me.netlify.app/"
            target="/"
            className="hover:text-[#2e3192] font-bold"
          >
            Nazmul Islam
          </Link>
          .
        </p>
        <p className="mb-0 text-xs font-semibold text-left text-gray-600 md:mb-0">
          Copyright &copy; 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
