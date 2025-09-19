import { Course } from "../types/course";

interface Props {
  courses: Course[];
}

export default function CourseTable({ courses }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Year</th>
            <th>Sem</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i} className="text-center border-t">
              <td>{c.year}</td>
              <td>{c.semester}</td>
              <td>{c.name}</td>
              <td>{c.credits}</td>
              <td>{c.grade}</td>
              <td>{c.points.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
