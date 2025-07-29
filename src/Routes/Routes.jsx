import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/MainLayouts/Home/Home";
import AllCourses from "../Pages/MainLayouts/AllCourses/AllCourses";
import OurLibrary from "../Pages/MainLayouts/OurLibrary/OurLibrary";
import AboutUs from "../Pages/MainLayouts/AboutUs/AboutUs";
import OurTeachers from "../Pages/MainLayouts/OurTeachers/OurTeachers";
import Contact from "../Pages/MainLayouts/Contact/Contact";
import CourseDetails from "../Pages/MainLayouts/CourseDetails/CourseDetails";
import Login from "../Pages/MainLayouts/Login/Login";
import SignUp from "./../Pages/MainLayouts/SignUp/SignUp";
import AdminLayout from "../Layouts/AdminLayout";
import StudentLayout from "../Layouts/StudentLayout";
import Courses from "../Pages/AdminDesh/Courses/Courses";
import AllUsers from "../Pages/AdminDesh/AllUsers/AllUsers";
import Orders from "../Pages/AdminDesh/Orders/Orders";
import AddNewCourse from "../Pages/AdminDesh/AddNewCourse/AddNewCourse";
import MyCourses from "../Pages/StudentDesh/MyCourses/MyCourses";
import PaymentPage from "../Pages/MainLayouts/PaymentPage/PaymentPage";
import EditCourse from "../Pages/AdminDesh/EditCourse/EditCourse";
import TutorLayout from "../Layouts/TutorLayout";
import AllTutors from "../Pages/AdminDesh/AllTutors/AllTutors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/AllCourses",
        element: <AllCourses />,
      },
      {
        path: "/library",
        element: <OurLibrary />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "teachers",
        element: <OurTeachers />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/courses/${params.id}`),
      },
      {
        path: "/paymentPage",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "addNewCourse",
        element: <AddNewCourse />,
      },
      {
        path: "editCourse/:id",
        element: <EditCourse />,
      },
      {
        path: "allTutors",
        element: <AllTutors />, // Placeholder for All Tutors page
      },
      {
        path: "addNewTutor",
        element: <div>Add New Tutor</div>, // Placeholder for Add New Tutor page
      },
    ],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "myCourses",
        element: <MyCourses />,
      },
    ],
  },
  {
    path: "/tutor",
    element: <TutorLayout />,
    children: [
      {
        path: "assignedCourses",
        element: <div>Assigned Courses</div>,
      },
    ],
  },
]);
