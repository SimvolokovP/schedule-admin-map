import { Fragment } from "react";
import type { Lesson, LessonType } from "../types";
import { getLessonAbbreviation } from "./helpers/getLessonAbbreviation";

interface ScheduleTableProps {
  days: string[];
  timeSlots: string[];
  groups: string[];
  lessons: Lesson[];
  onSelect: (cell: { day: string; time: string; group: string }) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  days,
  timeSlots,
  groups,
  lessons,
  onSelect,
}) => {
  

  const getLessonsForCell = (day: string, time: string, group: string) => {
    return lessons.filter(
      (lesson) =>
        lesson.day === day && lesson.time === time && lesson.group === group
    );
  };

  const renderLesson = (lesson: Lesson) => {
    const typeAbbr = getLessonAbbreviation(lesson.type);
    const isUniversal = lesson.subgroup === "both" && lesson.week === "both";

    return (
      <div
        key={lesson.id}
        className={`lesson ${lesson.type} ${isUniversal ? "universal" : ""}`}
      >
        <span className="lesson-type">{typeAbbr}</span>
        <div className="lesson-content">
          <div className="lesson-name">{lesson.name}</div>
          <div className="lesson-details">
            <span className="teacher">{lesson.teacher}</span>
            <span className="room">{lesson.room}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCell = (day: string, time: string, group: string) => {
    const cellLessons = getLessonsForCell(day, time, group);

    if (cellLessons.length === 0) {
      return (
        <td
          key={`${day}-${time}-${group}`}
          className="empty-cell"
          onClick={() => onSelect({ day, time, group })}
        ></td>
      );
    }

    const universalLesson = cellLessons.find(
      (lesson) => lesson.subgroup === "both" && lesson.week === "both"
    );

    if (universalLesson) {
      return (
        <td key={`${day}-${time}-${group}`} className="group-cell">
          <div className="cell-grid universal-lesson">
            {renderLesson(universalLesson)}
          </div>
        </td>
      );
    }

    const lessonsMap: Record<string, Lesson[]> = {
      "numerator-1": [],
      "numerator-2": [],
      "denominator-1": [],
      "denominator-2": [],
      "both-1": [],
      "both-2": [],
    };

    cellLessons.forEach((lesson) => {
      const weekKey = lesson.week === "both" ? "both" : lesson.week;
      const subgroupKey = lesson.subgroup === "both" ? "both" : lesson.subgroup;

      if (subgroupKey === "both") {
        lessonsMap[`${weekKey}-1`].push(lesson);
        lessonsMap[`${weekKey}-2`].push(lesson);
      } else {
        const key = `${weekKey}-${subgroupKey}`;
        lessonsMap[key].push(lesson);
      }
    });

    return (
      <td key={`${day}-${time}-${group}`} className="group-cell">
        <div className="cell-grid">
          <div className="cell-part numerator">
            <div className="subgroup-part subgroup-1">
              {lessonsMap["numerator-1"].map(renderLesson)}
              {lessonsMap["both-1"].map(renderLesson)}
            </div>
            <div className="subgroup-divider vertical"></div>
            <div className="subgroup-part subgroup-2">
              {lessonsMap["numerator-2"].map(renderLesson)}
              {lessonsMap["both-2"].map(renderLesson)}
            </div>
          </div>

          <div className="week-divider horizontal"></div>

          <div className="cell-part denominator">
            <div className="subgroup-part subgroup-1">
              {lessonsMap["denominator-1"].map(renderLesson)}
              {lessonsMap["both-1"].map(renderLesson)}
            </div>
            <div className="subgroup-divider vertical"></div>
            <div className="subgroup-part subgroup-2">
              {lessonsMap["denominator-2"].map(renderLesson)}
              {lessonsMap["both-2"].map(renderLesson)}
            </div>
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="schedule-wrapper">
      <div className="schedule-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th rowSpan={2}>День</th>
              <th rowSpan={2}>Время</th>
              {groups.map((group) => (
                <th key={group} colSpan={1}>
                  {group}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <Fragment key={day}>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={`${day}-${time}`}>
                    {timeIndex === 0 && (
                      <td rowSpan={timeSlots.length} className="day-cell">
                        {day}
                      </td>
                    )}
                    <td className="time-cell">{time}</td>
                    {groups.map((group) => renderCell(day, time, group))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
