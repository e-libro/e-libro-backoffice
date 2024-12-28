import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Overview from "../../pages/Overview/Overview";
import Profile from "../../pages/Profile/Profile";
import Settings from "../../pages/Settings/Settings";
import UserManagement from "../../components/UserManagement/UserManagement";

const AuthenticatedApp = () => {
  return (
    <>
      <Header />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="flex-grow-1 overflow-auto" style={{ marginLeft: "200px", marginTop: "56px" }}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="user-management" element={<UserManagement />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthenticatedApp;
