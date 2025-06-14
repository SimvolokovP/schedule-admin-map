import { Fragment } from "react";
import type { Lesson } from "../types";
import LessonCell from "./LessonCell";
import ScheduleLegend from "./ScheduleLegend";

interface ScheduleTableProps {
  days: string[];
  timeSlots: string[];
  groups: string[];
  lessons: Lesson[];
  onSelect: (cell: {
    day: string;
    time: string;
    group: string;
    subgroup?: 1 | 2 | "both";
    week?: "numerator" | "denominator" | "both";
  }) => void;
  onEdit: (updatedLesson: Lesson) => void;
  onDelete: (lessonId: string) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  days,
  timeSlots,
  groups,
  lessons,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const getLessonsForCell = (day: string, time: string, group: string) => {
    return lessons.filter(
      (lesson) =>
        lesson.day === day && lesson.time === time && lesson.group === group
    );
  };

  // const handleSubCellClick = (
  //   day: string,
  //   time: string,
  //   group: string,
  //   subgroup: 1 | 2 | "both",
  //   week: "numerator" | "denominator" | "both"
  // ) => {
  //   onSelect({ day, time, group, subgroup, week });
  // };

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
            <LessonCell
              lesson={universalLesson}
              onEdit={onEdit}
              onDelete={onDelete}
            />
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
            <div
              className="subgroup-part subgroup-1 clickable-subcell"
              // onClick={() =>
              //   handleSubCellClick(day, time, group, 1, "numerator")
              // }
            >
              {lessonsMap["numerator-1"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["both-1"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["numerator-1"].length === 0 &&
                lessonsMap["both-1"].length === 0 && (
                  <div className="empty-subcell"></div>
                )}
            </div>
            <div className="subgroup-divider vertical"></div>
            <div
              className="subgroup-part subgroup-2 clickable-subcell"
              // onClick={() =>
              //   handleSubCellClick(day, time, group, 2, "numerator")
              // }
            >
              {lessonsMap["numerator-2"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["both-2"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["numerator-2"].length === 0 &&
                lessonsMap["both-2"].length === 0 && (
                  <div className="empty-subcell"></div>
                )}
            </div>
          </div>

          <div className="week-divider horizontal"></div>

          {/* Нижний ряд (знаменатель) */}
          <div className="cell-part denominator">
            <div
              className="subgroup-part subgroup-1 clickable-subcell"
              // onClick={() =>
              //   handleSubCellClick(day, time, group, 1, "denominator")
              // }
            >
              {lessonsMap["denominator-1"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["both-1"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["denominator-1"].length === 0 &&
                lessonsMap["both-1"].length === 0 && (
                  <div className="empty-subcell"></div>
                )}
            </div>
            <div className="subgroup-divider vertical"></div>
            <div
              className="subgroup-part subgroup-2 clickable-subcell"
              // onClick={() =>
              //   handleSubCellClick(day, time, group, 2, "denominator")
              // }
            >
              {lessonsMap["denominator-2"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["both-2"].map((lesson) => (
                <LessonCell
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {lessonsMap["denominator-2"].length === 0 &&
                lessonsMap["both-2"].length === 0 && (
                  <div className="empty-subcell"></div>
                )}
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
        <ScheduleLegend />
      </div>
    </div>
  );
};

export default ScheduleTable;
