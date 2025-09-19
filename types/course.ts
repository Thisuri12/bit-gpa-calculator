export type CourseType = "C" | "O" | "E";

export interface Course {
  year: number;
  semester: number;
  name: string;
  credits: number;
  grade: string;
  points: number;
  type: CourseType;
}
