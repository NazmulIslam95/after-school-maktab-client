import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/MainLayouts/Home/Home";
import AllCourses from "../Pages/MainLayouts/AllCourses/AllCourses";

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
    ],
  },
  {
    path: "/admin",
    element: <MainLayout></MainLayout>,
    children: [{}],
  },
]);
