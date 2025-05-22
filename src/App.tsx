import React, { useState } from "react";
import ScheduleTable from "./ScheduleTable";
import { scheduleData } from "./mock";
import type { Lesson, ScheduleData } from "./types";
import Modal from "./Modal";

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleData>(scheduleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLesson, setNewLesson] = useState<Omit<Lesson, "id">>({
    name: "",
    type: "lecture",
    teacher: "",
    room: "",
    subgroup: "both",
    week: "both",
  });
  const [selectedCell, setSelectedCell] = useState<{
    day: string;
    time: string;
    group: string;
  } | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCell(null);
    setNewLesson({
      name: "",
      type: "lecture",
      teacher: "",
      room: "",
      subgroup: "both",
      week: "both",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewLesson((prev) => {
      if (name === "subgroup") {
        return {
          ...prev,
          subgroup: value === "both" ? "both" : (Number(value) as 1 | 2),
        };
      } else if (name === "week") {
        return {
          ...prev,
          week: value as "both" | "numerator" | "denominator",
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCell) return;

    const lesson: Lesson = {
      ...newLesson,
      id: Math.random().toString(36).substr(2, 9),
    };

    onAddLesson(
      lesson,
      selectedCell.day,
      selectedCell.time,
      selectedCell.group
    );
    closeModal();
  };

  const onAddLesson = (
    lesson: Lesson,
    day: string,
    time: string,
    group: string
  ) => {
    console.log(lesson);
    setSchedule((prevSchedule) => {
      // Создаем глубокую копию расписания
      const newSchedule = JSON.parse(
        JSON.stringify(prevSchedule)
      ) as ScheduleData;

      // Находим нужный день
      const dayIndex = newSchedule.days.findIndex((d) => d.day === day);
      if (dayIndex === -1) return prevSchedule;

      // Находим нужный временной слот
      const timeSlotIndex = newSchedule.days[dayIndex].timeSlots.findIndex(
        (t) => t.time === time
      );
      if (timeSlotIndex === -1) return prevSchedule;

      // Добавляем урок в соответствующую группу
      const timeSlot = newSchedule.days[dayIndex].timeSlots[timeSlotIndex];
      if (!timeSlot.lessons[group]) {
        timeSlot.lessons[group] = [];
      }
      timeSlot.lessons[group].push(lesson);
      console.log(newSchedule);

      return newSchedule;
    });
  };

  return (
    <div className="App">
      <h1>Расписание занятий</h1>
      <button onClick={openModal}>Add+</button>
      <ScheduleTable
        data={schedule}
        onSelect={(cell: { day: string; time: string; group: string }) =>
          setSelectedCell(cell)
        }
        selectedCell={selectedCell}
      />
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          newLesson={newLesson}
          handleSubmit={handleSubmit}
          selectedCell={selectedCell}
        />
      )}
    </div>
  );
};

export default App;
