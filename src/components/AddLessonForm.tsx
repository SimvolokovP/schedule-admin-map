import type { FC, FormEvent } from "react";
import type { Lesson, SubgroupType, WeekType } from "../types";
import { DAYS_OF_WEEK, TIME_SLOTS } from "../tableHelpers";

interface AddLessonFormProps {
  selectedCell?: {
    day: string;
    time: string;
    group: string;
    week?: WeekType;
    subgroup?: SubgroupType;
  } | null;
  handleSubmit: (e: FormEvent) => void;
  newLesson: Omit<Lesson, "id">;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const AddLessonForm: FC<AddLessonFormProps> = ({
  handleInputChange,
  handleSubmit,
  newLesson,
  selectedCell,
}) => {
  return (
    <>
      <h3>Добавить новый урок</h3>
      <p>Группа: {selectedCell?.group || newLesson.group || ""}</p>

      <form onSubmit={handleSubmit}>
        {!selectedCell && (
          <>
            <div className="form-group">
              <label>Учебная Группа:</label>
              <select
                name="group"
                value={newLesson.group || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Выберите группу</option>
                <option value="У-222">У-222</option>
                <option value="У-223">У-223</option>
                <option value="У-224">У-224</option>
              </select>
            </div>

            <div className="form-group">
              <label>День недели:</label>
              <select
                name="day"
                value={newLesson.day || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Выберите день</option>
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Временной слот:</label>
              <select
                name="time"
                value={newLesson.time || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Выберите время</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {selectedCell && (
          <p>
            День: {selectedCell.day}
            <br />
            Время: {selectedCell.time}
          </p>
        )}

        <div className="form-group">
          <label>Название предмета:</label>
          <input
            type="text"
            name="name"
            value={newLesson.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Тип занятия:</label>
          <select
            name="type"
            value={newLesson.type}
            onChange={handleInputChange}
            required
          >
            <option value="lecture">Лекция</option>
            <option value="practice">Практика</option>
            <option value="lab">Лабораторная</option>
            <option value="elective">Электив</option>
          </select>
        </div>

        <div className="form-group">
          <label>Преподаватель:</label>
          <input
            type="text"
            name="teacher"
            value={newLesson.teacher}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Аудитория:</label>
          <input
            type="text"
            name="room"
            value={newLesson.room}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Неделя:</label>
            <select
              name="week"
              value={selectedCell?.week || newLesson.week}
              onChange={handleInputChange}
              required
            >
              <option value="both">Обе недели</option>
              <option value="numerator">Числитель</option>
              <option value="denominator">Знаменатель</option>
            </select>
          </div>

          <div className="form-group">
            <label>Подгруппа:</label>
            <select
              name="subgroup"
              value={selectedCell?.subgroup || newLesson.subgroup}
              onChange={handleInputChange}
              required
            >
              <option value="both">Обе подгруппы</option>
              <option value={1}>Подгруппа 1</option>
              <option value={2}>Подгруппа 2</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="submit">ОК</button>
        </div>
      </form>
    </>
  );
};

export default AddLessonForm;
