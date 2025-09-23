import { Outlet } from "react-router-dom";
import WhatsAppButton from "../Components/WhatsAppButton";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
      <WhatsAppButton/>
      {/* The Outlet component is used to render child routes in the MainLayout */}
    </div>
  );
};

export default MainLayout;
