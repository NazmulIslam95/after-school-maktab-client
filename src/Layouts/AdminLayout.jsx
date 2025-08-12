import { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import useCurrentUser from "../CustomHooks/useCurrentUser";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Admin Successfully Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const navItems = (
    <>
      <Link to="/admin/courses" className="block px-4 p-1 hover:bg-gray-100">
        Courses
      </Link>
      <Link to="/admin/orders" className="block px-4 p-1 hover:bg-gray-100">
        Admission Req
      </Link>
      <Link to="/admin/demoReq" className="block px-4 p-1 hover:bg-gray-100">
        Demo Req
      </Link>
      <Link to="/admin/allUsers" className="block px-4 p-1 hover:bg-gray-100">
        Users
      </Link>
      <Link to="/admin/allTutors" className="block px-4 p-1 hover:bg-gray-100">
        Tutors
      </Link>
      <Link
        to="/admin/allTestimonials"
        className="block px-4 p-1 hover:bg-gray-100"
      >
        Testimonials
      </Link>
      <Link
        to="/admin/paymentHistory"
        className="block px-4 p-1 hover:bg-gray-100"
      >
        Payment History
      </Link>
      <Link
        to="/admin/addNewTutor"
        className="block px-4 p-1 hover:bg-gray-100"
      >
        Add New Tutor
      </Link>
      <Link
        to="/admin/addNewTestimonial"
        className="block px-4 p-1 hover:bg-gray-100"
      >
        Add New Testimonial
      </Link>
      <Link
        to="/admin/addNewCourse"
        className="block px-4 p-1 hover:bg-gray-100"
      >
        Add New Course
      </Link>
      <button
        onClick={handleLogout}
        className="block px-4 p-1 w-full text-left hover:bg-gray-100 text-red-500"
      >
        Logout
      </button>
    </>
  );

  const adminProfile = (
    <div className="mt-6 border-t pt-4 text-center">
      <img
        src={
          currentUser?.image ||
          "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
        }
        alt="Admin"
        className="w-16 h-16 rounded-full mx-auto mb-2"
      />

      <Link to="/admin/myProfile" className="block px-4 hover:bg-gray-100">
        {currentUser?.name}
      </Link>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden hind-siliguri-medium">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-white shadow-2xl p-4">
        <div>
          <div className="text-center">
            <Link to="/">
              <img
                src="https://i.ibb.co/v47RkJ3K/Logo-3-Edited.png"
                alt="Institute Logo"
                className="w-20 mx-auto mb-4"
              />
            </Link>
          </div>
          <nav>{navItems}</nav>
        </div>
        {adminProfile}
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
          <h1 className="text-lg font-semibold">Admin Panel</h1>
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
            <div className="text-center p-4 border-b">
              <img
                src="/logo.png"
                alt="Institute Logo"
                className="w-20 mx-auto mb-2"
              />
              <h2 className="text-sm font-semibold">{user?.displayName}</h2>
            </div>
            <nav className="p-4" onClick={() => setIsDrawerOpen(false)}>
              {navItems}
            </nav>
          </div>
          <div className="p-4">{adminProfile}</div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
