import { Fragment } from "react/jsx-runtime";
import type { Lesson, LessonType, ScheduleData } from "./types";

interface ScheduleTableProps {
  data: ScheduleData;
}

const DAYS_OF_WEEK = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
];

const TIME_SLOTS = [
  "08.00-09.35",
  "09.45-11.20",
  "11.50-13.25",
  "13.35-15.10",
  "15.20-16.55",
  "17.05-18.40",
];

const ScheduleTable: React.FC<ScheduleTableProps> = ({ data }) => {
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

  const renderCell = (lessons: Lesson[] | undefined, group: string) => {
    if (!lessons || lessons.length === 0)
      return <td key={group} className="empty-cell"></td>;

    // Проверяем, есть ли общий урок для всех подгрупп и недель
    const universalLesson = lessons.find(
      (lesson) => lesson.week === "both" && lesson.subgroup === "both"
    );

    if (universalLesson) {
      return (
        <td key={group} className="group-cell">
          <div className="cell-grid universal-lesson">
            {renderLesson(universalLesson)}
          </div>
        </td>
      );
    }

    // Обычное отображение для остальных случаев
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
      <td key={group} className="group-cell">
        <div className="cell-grid">
          {/* Верхний ряд (числитель) */}
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

          {/* Нижний ряд (знаменатель) */}
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
                      renderCell(getLessonsForTimeSlot(day, time, group), group)
                    )}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

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
        <div className="legend-item">
          <div className="legend-week">
            <span className="numerator-mark">Ч</span>
            <span>Числитель</span>
          </div>
          <div className="legend-week">
            <span className="denominator-mark">З</span>
            <span>Знаменатель</span>
          </div>
        </div>
        <div className="legend-item">
          <div className="legend-subgroup">
            <span className="subgroup-1-mark">1</span>
            <span>Подгруппа 1</span>
          </div>
          <div className="legend-subgroup">
            <span className="subgroup-2-mark">2</span>
            <span>Подгруппа 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
