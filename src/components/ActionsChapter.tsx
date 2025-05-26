import { useState, type FC, type FormEvent } from "react";
import Modal from "./Modal";
import AddLessonForm from "./AddLessonForm";
import type { Lesson } from "../types";

interface ActionsChapterProps {
  handleSubmit: (e: FormEvent) => void;
  newLesson: Omit<Lesson, "id">;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ActionsChapter: FC<ActionsChapterProps> = ({
  handleInputChange,
  handleSubmit,
  newLesson,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="actions-chapter">
      <button onClick={() => setIsModalOpen(true)}>Добавить урок</button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddLessonForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            newLesson={newLesson}
          />
        </Modal>
      )}
    </div>
  );
};

export default ActionsChapter;
