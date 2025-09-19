"use client";
import { useState, useEffect } from "react";
import { Course, CourseType } from "../types/course";
import { curriculum } from "@/data/curriculum";

interface Props {
  onAdd: (course: Course) => void;
}

const gradeOptions: Record<CourseType, { label: string; value: string }[]> = {
  C: [
    { label: "A+ (4.00)", value: "4.00" },
    { label: "A (4.00)", value: "4.00" },
    { label: "A- (3.70)", value: "3.70" },
    { label: "B+ (3.30)", value: "3.30" },
    { label: "B (3.00)", value: "3.00" },
    { label: "C+ (2.30)", value: "2.30" },
    { label: "C (2.00)", value: "2.00" },
    { label: "D+ (1.30)", value: "1.30" },
    { label: "D (1.00)", value: "1.00" },
    { label: "E (0.00)", value: "0.00" },
    { label: "Absent (AB)", value: "0.00" },
  ],
  O: [
    { label: "Pass (Excluded)", value: "P" },
    { label: "Fail (Excluded)", value: "F" },
    { label: "Absent (AB)", value: "AB" },
  ],
  E: [
    { label: "Pass (Excluded)", value: "P" },
    { label: "Fail (Excluded)", value: "F" },
    { label: "Absent (AB)", value: "AB" },
  ],
};

export default function CourseForm({ onAdd }: Props) {
  const [academicYear, setAcademicYear] = useState<"2023" | "2024">("2023");
  const [year, setYear] = useState<number>(1);
  const [semester, setSemester] = useState<number>(1);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const key = `${year}-${semester}`;
    const courses = curriculum[academicYear]?.[key] ?? [];
    setSelectedCourses(courses.map((course) => ({ ...course })));
  }, [academicYear, year, semester]);

  const handleGradeChange = (index: number, grade: string) => {
    const updated = [...selectedCourses];
    updated[index].grade = grade;
    setSelectedCourses(updated);
  };

  const handleSubmit = () => {
    selectedCourses.forEach((course) => {
      const points =
        course.type === "C" ? course.credits * parseFloat(course.grade) : 0;
      onAdd({ ...course, points });
    });
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1">Academic Year</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value as "2023" | "2024")}
            className="border p-2 w-full"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border p-2 w-full"
          >
            {[1, 2, 3].map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(parseInt(e.target.value))}
            className="border p-2 w-full"
          >
            {[1, 2].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th className="text-left p-2">Course</th>
            <th className="text-left p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {selectedCourses.map((course, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{course.name}</td>
              <td className="p-2">
                <select
                  value={course.grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                  className="border p-1 w-full"
                >
                  {gradeOptions[course.type].map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Submit Grades
      </button>
    </div>
  );
}
