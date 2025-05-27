import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import Sidebar from "./components/Sidebar";
import UserPage from "./pages/UserPage";

const App: FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
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
