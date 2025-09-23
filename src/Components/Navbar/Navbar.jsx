import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { WiSunrise } from "react-icons/wi";
import { LuSunMoon } from "react-icons/lu";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaChalkboardTeacher, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { CiSettings, CiUser } from "react-icons/ci";
import useAdmin from "../../CustomHooks/useAdmin";
import { RxDashboard } from "react-icons/rx";
import useTutor from "../../CustomHooks/useTutor";
import { useTranslation } from "react-i18next";
import useAuth from "../../CustomHooks/useAuth";
import { FaFacebook } from "react-icons/fa6";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isTutor, isTutorLoading] = useTutor();
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sunTimes, setSunTimes] = useState({ sunrise: "", sunset: "" });

  // Language toggle using i18next
  const toggleLanguage = () => {
    const newLang = i18n.language === "EN" ? "BN" : "EN";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
        );
        const { sunrise, sunset } = response.data.results;

        const sunriseLocal = new Date(sunrise).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const sunsetLocal = new Date(sunset).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        setSunTimes({ sunrise: sunriseLocal, sunset: sunsetLocal });
      } catch (error) {
        console.error("Failed to fetch sun times", error);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `relative inline-block ${
      i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-bold"
    } transition duration-300 group
   text-[#2e3192] hover:text-[#1b1d46]
   before:content-[''] before:absolute before:left-0 before:-bottom-1
   before:h-[1.5px] before:bg-[#1b1d46] before:transition-all before:duration-300 before:ease-in-out
   ${
     isActive
       ? "before:w-full text-[#2e3192]"
       : "before:w-0 group-hover:before:w-full"
   }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block py-2 px-2 rounded-md ${
      isActive ? "bg-[#2e3192] text-white" : "text-[#2e3192] hover:bg-gray-100"
    } ${i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-bold"}`;

  const navItems = (
    <>
      <NavLink to="/" className={navLinkClasses}>
        {t("home")}
      </NavLink>
      <NavLink to="/AllCourses" className={navLinkClasses}>
        {t("courses")}
      </NavLink>
      <NavLink to="/library" className={navLinkClasses}>
        {t("library")}
      </NavLink>
      <NavLink to="/about" className={navLinkClasses}>
        {t("about")}
      </NavLink>
      {/* <NavLink to="/teachers" className={navLinkClasses}>
        {t("teachers")}
      </NavLink>
      <NavLink to="/contact" className={navLinkClasses}>
        {t("contact")}
      </NavLink> */}
    </>
  );

  const mobileNavItems = (
    <>
      <NavLink
        to="/"
        className={mobileNavLinkClasses}
        onClick={() => setIsDrawerOpen(false)}
      >
        {t("home")}
      </NavLink>
      <NavLink
        to="/AllCourses"
        className={mobileNavLinkClasses}
        onClick={() => setIsDrawerOpen(false)}
      >
        {t("courses")}
      </NavLink>
      <NavLink
        to="/library"
        className={mobileNavLinkClasses}
        onClick={() => setIsDrawerOpen(false)}
      >
        {t("library")}
      </NavLink>
      <NavLink
        to="/about"
        className={mobileNavLinkClasses}
        onClick={() => setIsDrawerOpen(false)}
      >
        {t("about")}
      </NavLink>
      {/* <NavLink
        to="/teachers"
        className={mobileNavLinkClasses}
        onClick={() => setIsDrawerOpen(false)}
      >
        {t("teachers")}
      </NavLink>
      <NavLink
        to="/contact"
        className={mobileNavLinkClasses}
        onClick={() => setIsDrawerOpen(false)}
      >
        {t("contact")}
      </NavLink> */}
    </>
  );

  return (
    <div className="relative hind-siliguri-medium">
      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
          .animate-fade-out { animation: fadeOut 0.3s ease-out forwards; }
          .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
          .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
        `}
      </style>

      {/* Top Info Bar - Hidden on mobile */}
      <div
        className={`absolute top-2 w-full hidden md:block text-white py-2 px-4 z-20 ${
          i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-bold"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between text-sm">
          <p className="flex items-center gap-2">
            <WiSunrise />
            {t("sunrise")}: {sunTimes.sunrise || t("loading")} | <LuSunMoon />
            {t("sunset")}: {sunTimes.sunset || t("loading")}
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              <HiOutlineDevicePhoneMobile />
              {t("hotline")}: +88 01787 110 752
            </p>
            <div className="flex gap-2 items-center">
              <Link
                to="https://www.facebook.com/share/14Dr7vs8wfP/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
                {/* <FaFacebook/> */}
              </Link>
              <Link to="https://www.instagram.com/after_school_maktab/#" target="_blank" rel="noreferrer">
                <FaInstagram />
              </Link>
              {/* <Link to="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube />
              </Link> */}
              {/* Language toggle */}
              <label className="cursor-pointer flex items-center gap-2">
                <span className="text-white text-xs font-semibold">
                  {i18n.language === "BN" ? "বাংলা" : "EN"}
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm bg-white border-white"
                  checked={i18n.language === "BN"}
                  onChange={toggleLanguage}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Default Navbar (desktop) */}
      <nav
        className={`absolute top-12 rounded-sm left-1/2 transform -translate-x-1/2 w-5/6 max-w-7xl z-30 transition-opacity duration-300 bg-[#ffffff] hidden md:block ${
          scrolled
            ? "opacity-0 pointer-events-none animate-fade-out"
            : "opacity-100 animate-fade-in"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4 md:px-0">
          <Link to="/">
            <img
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt="Logo"
              className="w-12"
            />
          </Link>
          <div className="flex items-center">
            <div className="space-x-6">{navItems}</div>
            <p className="mx-4 text-gray-300">|</p>
            <div className="flex items-center text-[#2e3192] text-xl">
              {loading || isAdminLoading || isTutorLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ) : user ? (
                <div className="relative text-2xl hover:text-[#078DD3]">
                  {isAdmin ? (
                    <Link to="/admin/courses">
                      <CiSettings />
                    </Link>
                  ) : isTutor ? (
                    <Link to="/tutor/assignedCourses">
                      <FaChalkboardTeacher />
                    </Link>
                  ) : (
                    <Link to="/student/myProfile">
                      <RxDashboard />
                    </Link>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <CiUser />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolled Navbar (desktop) */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-opacity duration-300 bg-white shadow-md hidden md:block ${
          scrolled
            ? "opacity-100 animate-slide-down"
            : "opacity-0 pointer-events-none animate-fade-out"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/">
            <img
              src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
              alt="Logo"
              className="w-10"
            />
          </Link>
          <div className="flex items-center space-x-6">{navItems}</div>
        </div>
      </nav>

      {/* Mobile Top Bar - Only logo and menu button */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-40 flex justify-between items-center p-4 md:hidden">
        <Link to="/">
          <img
            src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
            alt="Logo"
            className="w-10"
          />
        </Link>
        <button onClick={() => setIsDrawerOpen(true)}>
          <Menu className="h-6 w-6 text-[#2e3192]" />
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-40 flex justify-around items-center p-2 md:hidden border-t border-gray-200 animate-slide-up">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-xs ${
              isActive ? "text-[#2e3192] font-bold" : "text-gray-600"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {t("home")}
        </NavLink>
        <NavLink
          to="/AllCourses"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-xs ${
              isActive ? "text-[#2e3192] font-bold" : "text-gray-600"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          {t("courses")}
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-xs ${
              isActive ? "text-[#2e3192] font-bold" : "text-gray-600"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>
          {t("library")}
        </NavLink>
        {user ? (
          <NavLink
            to={
              isAdmin
                ? "/admin/courses"
                : isTutor
                  ? "/tutor/assignedCourses"
                  : "/student/myProfile"
            }
            className={({ isActive }) =>
              `flex flex-col items-center p-2 text-xs ${
                isActive ? "text-[#2e3192] font-bold" : "text-gray-600"
              }`
            }
          >
            {isAdmin ? (
              <CiSettings className="h-5 w-5" />
            ) : isTutor ? (
              <FaChalkboardTeacher className="h-5 w-5" />
            ) : (
              <RxDashboard className="h-5 w-5" />
            )}
            {t("dashboard")}
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 text-xs ${
                isActive ? "text-[#2e3192] font-bold" : "text-gray-600"
              }`
            }
          >
            <CiUser className="h-5 w-5" />
            {t("login")}
          </NavLink>
        )}
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-5 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <img
                src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
                alt="Logo"
                className="w-10"
              />
              <button
                className="text-[#2e3192]"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              {mobileNavItems}
              <div className="mt-4">
                <label className="flex items-center justify-between p-2 border border-[#2e3192] rounded-md">
                  <span className="text-[#2e3192]">
                    {t("language")}: {i18n.language === "BN" ? "বাংলা" : "EN"}
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm bg-white border-[#2e3192] checked:bg-[#2e3192]"
                    checked={i18n.language === "BN"}
                    onChange={toggleLanguage}
                  />
                </label>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Link
                  to="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2e3192]"
                >
                  <FaFacebookF size={20} />
                </Link>
                <Link
                  to="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2e3192]"
                >
                  <FaYoutube size={20} />
                </Link>
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineDevicePhoneMobile size={20} />
                  <span>{t("hotline")}: 017XX-XXXXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
