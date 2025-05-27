import { type FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import Sidebar from "./components/Sidebar";
import UserPage from "./pages/UserPage";

const App: FC = () => {
  const location = useLocation();

  const isUserPage = location.pathname === "/user";

  return (
    <div className="app-container">
      {!isUserPage && <Sidebar />}
      <div className="content-with-sidebar">
        <Routes>
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
