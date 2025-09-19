"use client";
import { useState } from "react";
import CourseForm from "../components/course-form";
import CourseTable from "../components/course-table";
import GPASummary from "../components/gpa-summary";
import { calculateGPA } from "@/lib/gpa";
import { Course } from "../types/course";

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);

  const handleAddCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
  };

  const result = calculateGPA(courses);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">BIT GPA Calculator</h1>

      <CourseForm onAdd={handleAddCourse} />
      <CourseTable courses={courses} />
      <GPASummary result={result} />
    </main>
  );
}
