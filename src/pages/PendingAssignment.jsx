import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchPendingAssignments = async () => {
      if (!user) return;

      try {
        const response = await fetch("http://localhost:3000/submitAssignment");
        const data = await response.json();

        // Filter only pending assignments (exclude marked assignments)
        const pendingAssignments = data.filter(
          (assignment) => assignment.obtainedMarks === null
        );

        setAssignments(pendingAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchPendingAssignments();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Assignments</h2>

      {assignments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">User Email</th>
                <th className="border p-2">Total Marks</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id} className="hover:bg-gray-100">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{assignment.title}</td>
                  <td className="border p-2">{assignment.userEmail}</td>
                  <td className="border p-2">{assignment.totalMarks}</td>
                  <td className="border p-2 text-red-500 font-semibold">{assignment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No pending assignments found.</p>
      )}
    </div>
  );
};

export default PendingAssignments;
