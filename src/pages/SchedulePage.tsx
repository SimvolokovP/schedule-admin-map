import { useState } from "react";
import ActionsChapter from "../components/ActionsChapter";
import AddLessonForm from "../components/AddLessonForm";
import Modal from "../components/Modal";
import ScheduleTable from "../components/ScheduleTable";
import type { Lesson } from "../types";
import { useSchedule } from "../store/useSchedule";

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

const SchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLesson, setNewLesson] = useState<Omit<Lesson, "id">>({
    name: "",
    type: "lecture",
    teacher: "",
    room: "",
    subgroup: "both",
    week: "both",
    day: "",
    time: "",
    group: "",
  });
  const [selectedCell, setSelectedCell] = useState<{
    day: string;
    time: string;
    group: string;
  } | null>(null);

  const { data, addLesson } = useSchedule();

  const openModal = (cell: { day: string; time: string; group: string }) => {
    setSelectedCell(cell);
    setNewLesson((prev) => ({
      ...prev,
      day: cell.day,
      time: cell.time,
      group: cell.group,
    }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCell(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewLesson((prev) => ({
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

    const lesson: Lesson = {
      ...newLesson,
      id: Math.random().toString(36).substr(2, 9),
    };

    addLesson(lesson);

    closeModal();
  };

  return (
    <div>
      <ActionsChapter
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        newLesson={newLesson}
      />
      <div>{data.faculty}</div>
      <ScheduleTable
        days={DAYS_OF_WEEK}
        timeSlots={TIME_SLOTS}
        groups={data.groups}
        lessons={data.lessons}
        onSelect={openModal}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddLessonForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            newLesson={newLesson}
            selectedCell={selectedCell}
          />
        </Modal>
      )}
    </div>
  );
};

export default SchedulePage;
