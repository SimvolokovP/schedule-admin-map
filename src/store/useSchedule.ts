import { create } from "zustand";
import type { Lesson, ScheduleData } from "../types";

interface ScheduleState {
  data: ScheduleData;
  addLesson: (lesson: Lesson) => void;
}

const loadFromLocalStorage = (): ScheduleData => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("scheduleData");
    return savedData
      ? JSON.parse(savedData)
      : {
          faculty: "Информационные системы и технологии",
          groups: ["У-222", "У-223", "У-224"],
          lessons: [],
          semester: "2",
          year: "2025",
        };
  }
  return { faculty: "", groups: [], lessons: [], semester: "", year: "" };
};

export const useSchedule = create<ScheduleState>((set, get) => ({
  data: loadFromLocalStorage(),
  addLesson: (lesson: Lesson) => {
    const currentData = get().data;
    const updatedLessons = [...currentData.lessons, lesson];
    const updatedData = { ...currentData, lessons: updatedLessons };

    if (typeof window !== "undefined") {
      localStorage.setItem("scheduleData", JSON.stringify(updatedData));
    }

    set({ data: updatedData });
  },
}));
