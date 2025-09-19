import { Course } from "../types/course";

export function calculateGPA(courses: Course[]) {
  const compulsory = courses.filter((c) => c.type === "C");
  const totalCredits = compulsory.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = compulsory.reduce((sum, c) => sum + c.points, 0);
  const gpa = totalCredits ? totalPoints / totalCredits : 0;

  return {
    gpa: gpa.toFixed(2),
    class: getClass(gpa),
    credits: totalCredits,
    points: totalPoints.toFixed(2),
  };
}

function getClass(gpa: number): string {
  if (gpa >= 3.7) return "🎓 First Class";
  if (gpa >= 3.3) return "🥈 Second Class Upper";
  if (gpa >= 3.0) return "🥉 Second Class Lower";
  if (gpa >= 2.0) return "✅ General Class";
  return "❌ Fail";
}
