import { useEffect, useState } from "react";
import { useSchedule, type LessonsFilterParams } from "../store/useSchedule";
import type { Lesson, SubgroupType, WeekType } from "../types";
import { getLessonAbbreviation } from "../components/helpers/getLessonAbbreviation";

const UserPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { getFilteredLessons } = useSchedule();

  const [filterParams, setFilterParams] = useState<LessonsFilterParams>({
    day: "ПОНЕДЕЛЬНИК",
    group: "У-223",
    subgroup: 1,
    week: "numerator",
  });

  useEffect(() => {
    const targetLessons = getFilteredLessons(filterParams);
    console.log(targetLessons);
    setLessons(targetLessons);
  }, [filterParams]);

  // Обработчик для подгруппы
  const handleSubgroupChange = (value: string) => {
    let subgroupValue: SubgroupType;
    if (value === "1" || value === "2") {
      subgroupValue = parseInt(value) as SubgroupType;
    } else {
      subgroupValue = "both";
    }
    setFilterParams({ ...filterParams, subgroup: subgroupValue });
  };

  // Обработчик для недели
  const handleWeekChange = (value: string) => {
    setFilterParams({ ...filterParams, week: value as WeekType });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        {/* Выбор группы */}
        <select
          onChange={(v) =>
            setFilterParams({ ...filterParams, group: v.target.value })
          }
        >
          <option selected={false} value="">
            Группа
          </option>
          <option value="У-222">У-222</option>
          <option value="У-223">У-223</option>
          <option value="У-224">У-224</option>
        </select>

        <select
          value={filterParams.subgroup}
          onChange={(v) => handleSubgroupChange(v.target.value)}
        >
          <option selected={false} value="">
            Подгруппа
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        {/* Выбор дня недели */}
        <select
          value={filterParams.day}
          onChange={(v) =>
            setFilterParams({ ...filterParams, day: v.target.value })
          }
        >
          <option value="ПОНЕДЕЛЬНИК">ПОНЕДЕЛЬНИК</option>
          <option value="ВТОРНИК">ВТОРНИК</option>
          <option value="СРЕДА">СРЕДА</option>
          <option value="ЧЕТВЕРГ">ЧЕТВЕРГ</option>
          <option value="ПЯТНИЦА">ПЯТНИЦА</option>
          <option value="СУББОТА">СУББОТА</option>
          <option value="ВОСКРЕСЕНЬЕ">ВОСКРЕСЕНЬЕ</option>
        </select>

        {/* Выбор типа недели */}
        <select
          value={filterParams.week}
          onChange={(v) => handleWeekChange(v.target.value)}
        >
          <option value="numerator">Числитель</option>
          <option value="denominator">Знаменатель</option>
        </select>
      </div>

      {lessons && lessons.length ? (
        <ul className="users-lessons-list">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <article className={`users-lessons-item ${lesson.type}`}>
                <div className="users-lessons-item-time">{lesson.time}</div>
                <div>
                  {getLessonAbbreviation(lesson.type)}. {lesson.name}
                </div>
                <div>
                  {lesson.teacher} - {lesson.room}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="users-lessons-empty">В этот день пар нет :)</div>
      )}
    </div>
  );
};

export default UserPage;
