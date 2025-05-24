const ScheduleLegend = () => {
  return (
    <div className="schedule-legend">
      <div className="legend-item">
        <span className="legend-color lecture"></span>
        <span>Лекция</span>
      </div>
      <div className="legend-item">
        <span className="legend-color practice"></span>
        <span>Практика</span>
      </div>
      <div className="legend-item">
        <span className="legend-color lab"></span>
        <span>Лабораторная</span>
      </div>
    </div>
  );
};

export default ScheduleLegend;
