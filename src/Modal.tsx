import type { FC, FormEvent } from "react";
import type { Lesson } from "./types";

interface ModalProps {
  closeModal: () => void;
  selectedCell: {
    day: string;
    time: string;
    group: string;
  } | null;
  handleSubmit: (e: FormEvent) => void;
  newLesson: Omit<Lesson, "id">;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Modal: FC<ModalProps> = ({
  closeModal,
  handleSubmit,
  selectedCell,
  newLesson,
  handleInputChange,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Добавить новый урок</h3>
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>
            Группа: {selectedCell?.group || ""}
            <br />
            День: {selectedCell?.day || ""}
            <br />
            Время: {selectedCell?.time || ""}
          </p>

          <form onSubmit={handleSubmit}>
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
                  value={newLesson.week}
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
                  value={newLesson.subgroup}
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
              <button type="button" onClick={closeModal}>
                Отмена
              </button>
              <button type="submit">Добавить урок</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
