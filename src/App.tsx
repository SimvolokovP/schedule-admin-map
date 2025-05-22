import React from "react";
import ScheduleTable from "./ScheduleTable";
import { scheduleData } from "./mock";

const App: React.FC = () => {
  

  

  return (
    <div className="App">
      <h1>Расписание занятий</h1>
      <ScheduleTable data={scheduleData} />
    </div>
  );
};

export default App;
