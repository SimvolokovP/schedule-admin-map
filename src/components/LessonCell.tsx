import type { Lesson } from "../types";
import { useState } from "react";
import Modal from "./Modal";
import AddLessonForm from "./AddLessonForm";
import { getLessonAbbreviation } from "../helpers/getLessonAbbreviation";

interface LessonCellProps {
  lesson: Lesson;
  onEdit: (updatedLesson: Lesson) => void;
  onDelete: (lessonId: string) => void;
}

const LessonCell: React.FC<LessonCellProps> = ({
  lesson,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLesson, setEditLesson] = useState<Lesson>(lesson);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditLesson((prev) => ({
      ...prev,
      [name]:
        name === "subgroup"
          ? value === "both"
            ? "both"
            : (Number(value) as 1 | 2)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editLesson);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(lesson.id);
    setIsModalOpen(false);
  };

  const handleDeleteLesson = () => {
    if (confirm(`Удалить ${lesson.name}?`)) {
      handleDelete();
    }
  };

  const typeAbbr = getLessonAbbreviation(lesson.type);
  const isUniversal = lesson.subgroup === "both" && lesson.week === "both";

  return (
    <>
      <div
        className={`lesson ${lesson.type} ${isUniversal ? "universal" : ""}`}
        onClick={() => setIsModalOpen(true)}
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

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddLessonForm
            newLesson={editLesson}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <div className="modal-actions">
            <button
              type="button"
              className="delete-button"
              onClick={() => {
                handleDeleteLesson();
              }}
            >
              Удалить
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LessonCell;
