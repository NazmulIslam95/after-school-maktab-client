import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
      {/* The Outlet component is used to render child routes in the MainLayout */}
    </div>
  );
};

export default MainLayout;
