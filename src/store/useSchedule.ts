import { create } from "zustand";
import type { Lesson, ScheduleData, SubgroupType, WeekType } from "../types";

export interface LessonsFilterParams {
  group?: string;
  week?: WeekType;
  subgroup?: SubgroupType;
  day?: string;
}

interface ScheduleState {
  data: ScheduleData;
  addLesson: (lesson: Lesson) => void;
  getFilteredLessons: (params: LessonsFilterParams) => Lesson[];
}

const parseTime = (timeStr: string): number => {
  const [start] = timeStr.split("-");
  const [hours, minutes] = start.split(":").map(Number);
  return hours * 60 + minutes;
};

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
  getFilteredLessons: (params: LessonsFilterParams) => {
    const lessons = get().data.lessons;

    return lessons
      .filter((lesson) => {
        if (params.group && lesson.group !== params.group) return false;
        if (
          params.week &&
          lesson.week !== params.week &&
          lesson.week !== "both"
        )
          return false;
        if (
          params.subgroup &&
          lesson.subgroup !== params.subgroup &&
          lesson.subgroup !== "both"
        )
          return false;
        if (params.day && lesson.day !== params.day) return false;
        return true;
      })
      .sort((a, b) => parseTime(a.time) - parseTime(b.time));
  },
}));
