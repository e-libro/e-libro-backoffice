import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import About from "../../pages/About/About";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import NoMatch from "../../pages/NoMatch/NoMatch";
import UsersManagement from "../UsersManagement/UsersManagement";
import BooksManagement from "../BooksManagement/BooksManagement"; 
import UsersReportsContainer from "../UsersReportsContainer/UsersReportContainer";
import LanguagesDistributionReport from "../LanguagesDistributionReport/LanguagesDistributionReport";
import TopBooksChart from "../TopBooksChart/TopBooksChart";
import MonthlyUserSignupsReport from "../MonthlyUserSignupsReport/MonthlyUserSignupsReport";
import DualReportsContainer from "../DualReportsContainer/DualReportsContainer";
import Profile from "../../pages/Profile/Profile";

const AuthenticatedApp = () => {
  return (
    <>
      <Header />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="flex-grow-1 overflow-auto" style={{ marginLeft: "200px", marginTop: "56px" }}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<About />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<About />} />
                <Route path="profile" element={<Profile />} />
                <Route path="books-reports" element={<DualReportsContainer 
                                                        title="Reportes de libros"
                                                        leftComponent={<LanguagesDistributionReport />} 
                                                        rightComponent={<TopBooksChart />} />}/>
                <Route path="users-reports" element={<UsersReportsContainer><MonthlyUserSignupsReport/></UsersReportsContainer>} />
                <Route path="users-management" element={<UsersManagement />} />
                <Route path="books-management" element={<BooksManagement />} />
              </Route>
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedApp;
