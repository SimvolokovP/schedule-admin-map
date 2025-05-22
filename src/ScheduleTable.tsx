import { Fragment } from "react";
import type { Lesson, LessonType, ScheduleData } from "./types";
import { DAYS_OF_WEEK, TIME_SLOTS } from "./tableHelpers";
import ScheduleLegend from "./ScheduleLegend";

interface ScheduleTableProps {
  data: ScheduleData;
  onSelect: (cell: { day: string; time: string; group: string }) => void;
  selectedCell: { day: string; time: string; group: string } | null;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  data,
  onSelect,
  selectedCell,
}) => {
  const getLessonAbbreviation = (type: LessonType): string => {
    const abbreviations = {
      lecture: "л.",
      practice: "пр.",
      lab: "лаб.",
      elective: "электив",
    };
    return abbreviations[type] || "";
  };

  const renderLesson = (lesson: Lesson) => {
    const typeAbbr = getLessonAbbreviation(lesson.type);

    return (
      <div key={lesson.id} className={`lesson ${lesson.type}`}>
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

  const renderCell = (
    lessons: Lesson[] | undefined,
    group: string,
    day: string,
    time: string
  ) => {
    const isSelectedCell =
      selectedCell?.day === day &&
      selectedCell.group === group &&
      selectedCell.time === time;
    if (!lessons || lessons.length === 0)
      return (
        <td
          key={`${day}-${time}-${group}`}
          className={`empty-cell ${isSelectedCell ? "selected-cell" : ""}`}
          onClick={() => onSelect({ day, time, group })}
        ></td>
      );

    const universalLesson = lessons.find(
      (lesson) => lesson.week === "both" && lesson.subgroup === "both"
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

    lessons.forEach((lesson) => {
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

  const getLessonsForTimeSlot = (
    day: string,
    time: string,
    group: string
  ): Lesson[] | undefined => {
    const daySchedule = data.days.find((d) => d.day === day);
    if (!daySchedule) return undefined;

    const timeSlot = daySchedule.timeSlots.find((t) => t.time === time);
    if (!timeSlot) return undefined;

    return timeSlot.lessons[group];
  };

  return (
    <div className="schedule-wrapper">
      <div className="schedule-header">
        <h2>{data.faculty}</h2>
        <h3>
          Расписание занятий {data.year} учебный год, {data.semester}
        </h3>
      </div>

      <div className="schedule-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th rowSpan={2}>День</th>
              <th rowSpan={2}>Время</th>
              {data.groups.map((group) => (
                <th key={group} colSpan={1}>
                  {group}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS_OF_WEEK.map((day) => (
              <Fragment key={day}>
                {TIME_SLOTS.map((time, timeIndex) => (
                  <tr key={`${day}-${time}`}>
                    {timeIndex === 0 && (
                      <td rowSpan={TIME_SLOTS.length} className="day-cell">
                        {day}
                      </td>
                    )}
                    <td className="time-cell">{time}</td>
                    {data.groups.map((group) =>
                      renderCell(
                        getLessonsForTimeSlot(day, time, group),
                        group,
                        day,
                        time
                      )
                    )}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ScheduleLegend />
    </div>
  );
};

export default ScheduleTable;
