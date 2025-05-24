export type LessonType = "lecture" | "practice" | "lab";
export type WeekType = "numerator" | "denominator" | "both";
export type SubgroupType = 1 | 2 | "both";

export interface Lesson {
  id: string;
  name: string;
  type: LessonType;
  teacher: string;
  room: string;
  subgroup: SubgroupType;
  week: WeekType;
  day: string; 
  time: string; 
  group: string; 
  merged?: boolean;
}

export interface ScheduleData {
  lessons: Lesson[]; 
  groups: string[];
  semester: string;
  faculty: string;
  year: string;
}
