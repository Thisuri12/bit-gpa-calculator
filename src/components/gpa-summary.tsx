interface GPAResult {
  gpa: string;
  class: string;
  credits: number;
  points: string;
}

export default function GPASummary({ result }: { result: GPAResult }) {
  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">📊 GPA Summary</h2>
      <p>
        <strong>Total GPA Credits:</strong> {result.credits}
      </p>
      <p>
        <strong>Total Weighted Points:</strong> {result.points}
      </p>
      <p>
        <strong>Your GPA:</strong> {result.gpa}
      </p>
      <p>
        <strong>Class:</strong> {result.class}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        First Class ≥ 3.70 | Second Upper ≥ 3.30 | Second Lower ≥ 3.00 | General
        ≥ 2.00
      </p>
    </div>
  );
}
