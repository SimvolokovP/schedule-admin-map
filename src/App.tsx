import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import Sidebar from "./components/Sidebar";

const App: FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-with-sidebar">
        <Routes>
          <Route path="/schedule" element={<SchedulePage />} />
          {/* Добавьте другие маршруты по мере необходимости */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
