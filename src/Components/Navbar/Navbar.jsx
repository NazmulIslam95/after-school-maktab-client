import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react"; // or use HeroIcons
import { WiSunrise } from "react-icons/wi";
import { LuSunMoon } from "react-icons/lu";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
// import { Drawer } from '@/components/ui/drawer'; // if using a drawer lib or custom

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `relative px-4 py-2 transition duration-300 text-white font-serif hover:text-yellow-400
   before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px]
   before:bg-yellow-400 before:transition-all before:duration-300
   ${
     isActive
       ? "before:w-full text-yellow-400"
       : "before:w-0 hover:before:w-full"
   }`;

  const navItems = (
    <>
      <NavLink to="/" className={navLinkClasses}>
        Home
      </NavLink>
      <NavLink to="/courses" className={navLinkClasses}>
        Courses
      </NavLink>
      <NavLink to="/library" className={navLinkClasses}>
        Our Library
      </NavLink>
      <NavLink to="/about" className={navLinkClasses}>
        About Us
      </NavLink>
      <NavLink to="/teachers" className={navLinkClasses}>
        Our Teachers
      </NavLink>
      <NavLink to="/contact" className={navLinkClasses}>
        Contact
      </NavLink>
    </>
  );
  return (
    <div className="relative">
      {/* Top Info Bar */}
      <div className="font-serif absolute top-2 w-full hidden md:block text-white py-2 px-4 z-20">
        <div className="max-w-6xl mx-auto flex justify-between text-sm">
          <p className="flex items-center gap-2">
            {" "}
            <WiSunrise /> Sunrise: 5:15 AM | <LuSunMoon />
            Sunset: 6:45 PM
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              {" "}
              <HiOutlineDevicePhoneMobile />
              Hotline: 017XX-XXXXXX
            </p>
            <div className="flex gap-2">
              <Link to="https://facebook.com">
                <FaFacebookF />
              </Link>
              {/* <Link to="https://instagram.com">
                  <FaTwitter />
                </Link> */}
              {/* <Link to="https://twitter.com">
                  <FaLinkedinIn />
                </Link> */}
              <Link to="https://youtube.com">
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`absolute top-12 rounded-sm left-1/2 transform -translate-x-1/2 w-5/6 max-w-7xl z-30 transition-colors duration-300  ${
          scrolled
            ? "bg-white shadow-md sticky top-0"
            : "bg-[#058349] "
        }`}
      >
        <div className="max-w-6xl  mx-auto flex justify-between items-center p-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="">
            <span className={`${scrolled ? "" : ""}`}>
              <img
                src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
                alt=""
                className="w-12"
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4">
            <div className={`${scrolled ? "text-green-600" : "text-black"}`}>
              {navItems}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsDrawerOpen(true)}>
              <Menu
                className={`h-6 w-6 ${
                  scrolled ? "text-green-600" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 p-5 transition-all duration-300">
          <button
            className="text-green-600 mb-4"
            onClick={() => setIsDrawerOpen(false)}
          >
            ✕ Close
          </button>
          <div className="flex flex-col space-y-4 text-green-600">
            {navItems}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
