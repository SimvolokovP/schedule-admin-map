// types.ts
export type LessonType = 'lecture' | 'practice' | 'lab' | 'elective';
export type WeekType = 'numerator' | 'denominator' | 'both';
export type SubgroupType = 1 | 2 | 'both';

export interface Lesson {
  id: string;
  name: string;
  type: LessonType;
  teacher: string;
  room: string;
  subgroup: SubgroupType;
  week: WeekType;
  merged?: boolean;
}

export interface TimeSlot {
  time: string;
  lessons: Record<string, Lesson[]>;
}

export interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
}

export interface ScheduleData {
  days: DaySchedule[];
  groups: string[];
  semester: string;
  faculty: string;
  year: string;
}