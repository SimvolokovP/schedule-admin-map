import type { LessonType } from "../types";

export const getLessonAbbreviation = (type: LessonType): string => {
  const abbreviations = {
    lecture: "лк",
    practice: "пр",
    lab: "лб",
  };
  return abbreviations[type] || "";
};
