import type { DaySchedule, ScheduleData } from "./types";

export const scheduleData: ScheduleData = {
  faculty: "Управления и информатики в технологических системах",
  year: "2024-2025",
  semester: "Весенний семестр",
  groups: ["У-222", "У-223", "У-224"],
  days: [],
};

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

DAYS_OF_WEEK.forEach((day) => {
  const daySchedule: DaySchedule = {
    day,
    timeSlots: TIME_SLOTS.map((time) => ({
      time,
      lessons: {},
    })),
  };

  if (day === "ПОНЕДЕЛЬНИК") {
    // 08.00-09.35
    daySchedule.timeSlots[0].lessons["У-224"] = [
      {
        id: "0",
        name: "Метрология",
        type: "practice",
        teacher: "Суханов П.М.",
        room: "чердак",
        subgroup: 1,
        week: "both",
      },
    ];

    daySchedule.timeSlots[0].lessons["У-223"] = [
      {
        id: "1",
        name: "Метрология",
        type: "practice",
        teacher: "Суханов П.М.",
        room: "чердак",
        subgroup: "both",
        week: "both",
      },
    ];

    daySchedule.timeSlots[1].lessons["У-223"] = [
      {
        id: "6",
        name: "Методы и средства проектирования",
        type: "lecture",
        teacher: "Саввина Е.А.",
        room: "401",
        subgroup: "both",
        week: "both",
      },
    ];

    daySchedule.timeSlots[2].lessons["У-223"] = [
      {
        id: "7",
        name: "Web-разработка",
        type: "lecture",
        teacher: "Бородина Е.А.",
        room: "401",
        subgroup: "both",
        week: "numerator",
      },
      {
        id: "8",
        name: "Современные фреймворки",
        type: "lecture",
        teacher: "Грек А.В.",
        room: "401",
        subgroup: "both",
        week: "denominator",
      },
    ];

    daySchedule.timeSlots[3].lessons["У-223"] = [
      {
        id: "9",
        name: "Современные фреймворки",
        type: "practice",
        teacher: "Грек А.В.",
        room: "125",
        subgroup: 1,
        week: "numerator",
      },
      {
        id: "9",
        name: "Современные фреймворки",
        type: "practice",
        teacher: "Грек А.В.",
        room: "125",
        subgroup: 2,
        week: "denominator",
      },
    ];

    daySchedule.timeSlots[0].lessons["У-222"] = [
      {
        id: "2",
        name: "План. и орг. произв. проц.",
        type: "lab",
        teacher: "Кондаурова О.В.",
        room: "151",
        subgroup: 2,
        week: "numerator",
      },
      {
        id: "3",
        name: "План. и орг. произв. проц.",
        type: "lab",
        teacher: "Кондаурова О.В.",
        room: "151",
        subgroup: 1,
        week: "denominator",
      },
      {
        id: "4",
        name: "Математика",
        type: "practice",
        teacher: "Чернышев А.Д.",
        room: "225",
        subgroup: 1,
        week: "numerator",
      },
      {
        id: "5",
        name: "Математика",
        type: "practice",
        teacher: "Чернышев А.Д.",
        room: "225",
        subgroup: 2,
        week: "denominator",
      },
    ];

    // 09.45-11.20
    daySchedule.timeSlots[1].lessons["У-241"] = [
      {
        id: "mon-2-u241-1",
        name: "Основы формирования личности",
        type: "practice",
        teacher: "Гребенщиков А.Е.",
        room: "14",
        subgroup: 1,
        week: "numerator",
      },
      {
        id: "mon-2-u241-2",
        name: "Математика",
        type: "practice",
        teacher: "Половинкина М.В.",
        room: "207",
        subgroup: 1,
        week: "denominator",
      },
      {
        id: "mon-2-u241-3",
        name: "История России",
        type: "practice",
        teacher: "Баранов Д.А.",
        room: "14",
        subgroup: "both",
        week: "both",
      },
    ];

    daySchedule.timeSlots[1].lessons["У-243"] = [
      {
        id: "mon-2-u243",
        name: "Алгоритмы и структуры данных",
        type: "practice",
        teacher: "Савченко И.И.",
        room: "336",
        subgroup: "both",
        week: "both",
      },
    ];
  }

  // Аналогично заполняем другие дни...

  scheduleData.days.push(daySchedule);
});
