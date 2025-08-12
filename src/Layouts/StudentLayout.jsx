import { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import useCurrentUser from "../CustomHooks/useCurrentUser";

const StudentLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Successfully Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const navItems = (
    <>
      {/* <Link to="/student/home" className="block px-4 py-2 hover:bg-gray-100 libertinus-sans-regular">
        Home
      </Link> */}
      <Link
        to="/student/myCourses"
        className="block px-4 py-2 hover:bg-gray-100 libertinus-sans-regular"
      >
        My Courses
      </Link>
      <Link
        to="/student/myDemoCls"
        className="block px-4 py-2 hover:bg-gray-100 libertinus-sans-regular"
      >
        My Demo Classes
      </Link>
      <Link
        to="/student/myPayments"
        className="block px-4 py-2 hover:bg-gray-100 libertinus-sans-regular"
      >
        My Payments
      </Link>
      {/* <Link to="/student/results">
        <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 ">
          Results
        </button>
      </Link> */}
      <Link
        to="/student/myProfile"
        className="block px-4 py-2 hover:bg-gray-100 libertinus-sans-regular"
      >
        My Profile
      </Link>
      <button
        onClick={handleLogout}
        className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-red-500 libertinus-sans-regular"
      >
        Logout
      </button>
    </>
  );

  const studentProfile = (
    <div className="mt-4 border-t border-gray-300 pt-4 text-center">
      <img
        src={
          currentUser?.image ||
          "https://www.alaska.edu/_resources/images/placeholders/profile.png"
        }
        alt="Institute Logo"
        className="w-16 rounded-full mb-2 mx-auto"
      />
      <h2 className="text-sm font-semibold libertinus-sans-bold">
        {user?.displayName}
      </h2>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-white  shadow-2xl p-4">
        <div>
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/">
              <img
                src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
                alt="Institute Logo"
                className="w-20 mx-auto"
              />
            </Link>
          </div>
          {/* Nav Items */}
          <nav>{navItems}</nav>
        </div>
        {/* Profile */}
        {studentProfile}
      </aside>

      {/* Mobile Drawer Toggle */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden bg-white border-b p-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-700"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Student Dashboard</h1>
        </header>

        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        <aside
          className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg flex flex-col justify-between transform transition-transform duration-300 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div>
            {/* Logo */}
            <div className="text-center p-4 border-b">
              <img
                src="/logo.png"
                alt="Institute Logo"
                className="w-20 mx-auto"
              />
            </div>
            {/* Nav Items */}
            <nav className="p-4" onClick={() => setIsDrawerOpen(false)}>
              {navItems}
            </nav>
          </div>
          {/* Profile */}
          <div className="p-4">{studentProfile}</div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
