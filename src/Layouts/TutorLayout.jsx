import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";
import useCurrentUser from "../CustomHooks/useCurrentUser";
import useAuth from "../CustomHooks/useAuth";

const TutorLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useAuth();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tutor Successfully Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const navItems = (
    <>
      {/* <Link
        to="/tutor/myStudents"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        My Students
      </Link> */}
      <Link
        to="/tutor/assignedCourses"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Assigned Courses
      </Link>
      <Link
        to="/tutor/assignedDemoClasses"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Assigned Demo Classes
      </Link>
      {/* <Link to="/tutor/schedule" className="block px-4 py-2 hover:bg-gray-100">
        Schedule
      </Link> */}
      <button
        onClick={handleLogout}
        className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-red-500"
      >
        Logout
      </button>
    </>
  );

  const tutorProfile = (
    <div className="mt-6 border-t pt-4 text-center">
      <img
        src={
          currentUser?.image ||
          "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
        }
        alt={currentUser?.name}
        className="w-16 h-16 rounded-full mx-auto mb-2"
      />

      <Link to="/admin/myProfile" className="block px-4 hover:bg-gray-100">
        {currentUser?.name}
      </Link>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-white shadow-2xl p-4">
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
        {tutorProfile}
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
          <h1 className="text-lg font-semibold">Tutor Dashboard</h1>
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
          <div className="p-4">{tutorProfile}</div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TutorLayout;
