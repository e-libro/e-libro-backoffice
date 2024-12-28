import { Outlet } from "react-router-dom";
import { Card } from "react-bootstrap";

const DashboardLayout = () => {
  return (
    <div className="p-3">
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;