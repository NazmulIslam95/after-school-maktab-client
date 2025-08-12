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
import AdmissionPage from "../Pages/MainLayouts/AdmissionPage/AdmissionPage";
import EditCourse from "../Pages/AdminDesh/EditCourse/EditCourse";
import TutorLayout from "../Layouts/TutorLayout";
import AllTutors from "../Pages/AdminDesh/AllTutors/AllTutors";
import BookDemo from "../Pages/MainLayouts/BookDemo/BookDemo";
import AllDemoReq from "../Pages/AdminDesh/AllDemoReq/AllDemoReq";
import AddATutor from "../Pages/AdminDesh/AddATutor/AddATutor";
import MyDemoClass from "../Pages/StudentDesh/MyDemoClass/MyDemoClass";
import AssignedCourses from "../Pages/TutorDesh/AssignedCourses/AssignedCourses";
import AssignedDemoCls from "../Pages/TutorDesh/AssignedDemoCls/AssignedDemoCls";
import PaymentHistory from "../Pages/AdminDesh/PaymentHistory/PaymentHistory";
import MyPayments from "../Pages/StudentDesh/MyPayments/MyPayments";
import AddNewTestimonial from "../Pages/AdminDesh/AddNewTestimonial/AddNewTestimonial";
import AllTestimonials from "../Pages/AdminDesh/AllTestimonials/AllTestimonials";
import MyProfile from "../Pages/StudentDesh/MyProfile/MyProfile";
import TutorDetails from "../Pages/MainLayouts/TutorDetails/TutorDetails";

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
          fetch(
            `https://after-school-maktab-server.vercel.app/courses/${params.id}`
          ),
      },
      {
        path: "tutor/:id",
        element: <TutorDetails />,
        loader: ({ params }) =>
          fetch(
            `https://after-school-maktab-server.vercel.app/tutor/${params.id}`
          ),
      },
      {
        path: "/admissionPage",
        element: <AdmissionPage />,
      },
      {
        path: "/bookDemo",
        element: <BookDemo />,
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
        element: <AllTutors />,
      },
      {
        path: "addNewTutor",
        element: <AddATutor />,
      },
      {
        path: "demoReq",
        element: <AllDemoReq />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "allTestimonials",
        element: <AllTestimonials />,
      },
      {
        path: "addNewTestimonial",
        element: <AddNewTestimonial />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
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
      {
        path: "myDemoCls",
        element: <MyDemoClass />,
      },
      {
        path: "myPayments",
        element: <MyPayments />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/tutor",
    element: <TutorLayout />,
    children: [
      {
        path: "assignedCourses",
        element: <AssignedCourses />,
      },
      {
        path: "assignedDemoClasses",
        element: <AssignedDemoCls />,
      },
    ],
  },
]);
