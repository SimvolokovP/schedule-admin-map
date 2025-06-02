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
  // savedData: ScheduleData;
  // targetData: ScheduleData;
}

const ActionsChapter: FC<ActionsChapterProps> = ({
  handleInputChange,
  handleSubmit,
  newLesson,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isSavedBtnActive, setIsSaveBtnActive] = useState<boolean>(false);

  return (
    <div className="actions-chapter">
      <div
        style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setIsModalOpen(true)}>Добавить урок</button>
          <button disabled>Добавть Расписание Excel</button>
        </div>
        <button disabled={true}>Сохранить в бд</button>
      </div>
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
