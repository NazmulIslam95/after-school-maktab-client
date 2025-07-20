import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/MainLayouts/Home/Home";
import AllCourses from "../Pages/MainLayouts/AllCourses/AllCourses";
import OurLibrary from "../Pages/MainLayouts/OurLibrary/OurLibrary";
import AboutUs from "../Pages/MainLayouts/AboutUs/AboutUs";
import OurTeachers from "../Pages/MainLayouts/OurTeachers/OurTeachers";
import Contact from "../Pages/MainLayouts/Contact/Contact";

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
    ],
  },
  {
    path: "/admin",
    element: <MainLayout></MainLayout>,
    children: [{}],
  },
]);
