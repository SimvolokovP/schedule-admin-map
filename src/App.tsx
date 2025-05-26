import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </div>
  );
};

export default App;
