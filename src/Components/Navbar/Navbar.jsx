import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { WiSunrise } from "react-icons/wi";
import { LuSunMoon } from "react-icons/lu";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

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
    `relative inline-block font-serif transition duration-300 group
   text-[#2e3192] hover:text-[#1b1d46]
   before:content-[''] before:absolute before:left-0 before:-bottom-1
   before:h-[2px] before:bg-[#1b1d46] before:transition-all before:duration-300 before:ease-in-out
   ${
     isActive
       ? "before:w-full text-[#1b1d46]"
       : "before:w-0 group-hover:before:w-full"
   }`;

  const navItems = (
    <>
      <NavLink to="/" className={navLinkClasses}>
        Home
      </NavLink>
      <NavLink to="/AllCourses" className={navLinkClasses}>
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
      {/* Custom CSS for Animations */}
      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-slide-down {
            animation: slideDown 0.3s ease-out forwards;
          }
          .animate-fade-out {
            animation: fadeOut 0.3s ease-out forwards;
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Top Info Bar (Visible for md and larger) */}
      <div className="font-serif absolute top-2 w-full hidden md:block text-white py-2 px-4 z-20">
        <div className="max-w-6xl mx-auto flex justify-between text-sm">
          <p className="flex items-center gap-2">
            <WiSunrise /> Sunrise: 5:15 AM | <LuSunMoon />
            Sunset: 6:45 PM
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              <HiOutlineDevicePhoneMobile />
              Hotline: 017XX-XXXXXX
            </p>
            <div className="flex gap-2">
              <Link to="https://facebook.com">
                <FaFacebookF />
              </Link>
              <Link to="https://youtube.com">
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Default Navbar (Always in DOM, toggled with opacity) */}
      <nav
        className={`absolute top-12 rounded-sm left-1/2 transform -translate-x-1/2 w-5/6 max-w-7xl z-30 transition-opacity duration-300 bg-[#ffffff] hidden md:block ${
          scrolled
            ? "opacity-0 pointer-events-none animate-fade-out"
            : "opacity-100 animate-fade-in"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="">
            <img
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt="Logo"
              className="w-12"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="flex ">
            <div className="text-white space-x-4">{navItems}</div>
          </div>
        </div>
      </nav>

      {/* Scrolled Navbar (Always in DOM, toggled with opacity) */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-opacity duration-300 bg-[#ffff] shadow-md hidden md:block ${
          scrolled
            ? "opacity-100 animate-slide-down"
            : "opacity-0 pointer-events-none animate-fade-out"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/" className="">
            <img
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt="Logo"
              className="w-10"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="flex ">
            <div className="text-white space-x-4">{navItems}</div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar (Visible for smaller screens) */}
      <nav className="absolute top-12 rounded-sm left-1/2 transform -translate-x-1/2 w-5/6 max-w-7xl z-30 transition-colors duration-300 bg-[#ffff] md:hidden">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="">
            <img
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt="Logo"
              className="w-12"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsDrawerOpen(true)}>
              <Menu
                className={`h-6 w-6 ${
                  scrolled ? "text-green-600" : "text-[#2e3192]"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 p-5 transition-all duration-300 md:hidden">
          <button
            className="text-[#2e3192] mb-4"
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
