import { useState } from "react";
import ActionsChapter from "../components/ActionsChapter";
import AddLessonForm from "../components/AddLessonForm";
import Modal from "../components/Modal";
import ScheduleTable from "../components/ScheduleTable";
import type { Lesson } from "../types";
import { useSchedule } from "../store/useSchedule";
import { DAYS_OF_WEEK, TIME_SLOTS } from "../tableHelpers";

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

  const { data, addLesson, deleteLesson, updateLesson } = useSchedule();

  // const [targetData, setTargetData] = useState<ScheduleData>(
  //   {} as ScheduleData
  // );

  // useEffect(() => {
  //   if (data) {
  //     setTargetData(data);
  //   }
  // }, [data]);

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

  const handleEditLesson = (updatedLesson: Lesson) => {
    console.log("edit", updatedLesson);
    updateLesson(updatedLesson);
  };

  const handleDeleteLesson = (lessonId: string) => {
    console.log("delete" + lessonId);
    deleteLesson(lessonId);
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
    <div style={{ height: "100vh" }}>
      <ActionsChapter
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        newLesson={newLesson}
      />
      <div style={{ textAlign: "center", padding: "4px", fontSize: "18px" }}>
        {data.faculty} / {data.year}
      </div>
      <ScheduleTable
        onDelete={handleDeleteLesson}
        onEdit={handleEditLesson}
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
