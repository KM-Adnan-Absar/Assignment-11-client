import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const MyAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchUserAssignments = async () => {
      try {
        const response = await fetch("https://assignment-11-server-orcin-rho.vercel.app/submitAssignment");
        const data = await response.json();

        // Filter assignments submitted by the logged-in user
        const userAssignments = data.filter(
          (assignment) => assignment.userEmail === user.email
        );

        setAssignments(userAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    if (user?.email) {
      fetchUserAssignments();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Submitted Assignments</h2>

      {assignments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Total Marks</th>
                <th className="border p-2">Obtained Marks</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id} className="hover:bg-gray-100">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{assignment.title}</td>
                  <td className="border p-2">{assignment.totalMarks}</td>
                  <td className="border p-2 text-blue-500 font-semibold">
                    {assignment.obtainedMarks ?? "Pending"}
                  </td>
                  <td className="border p-2 text-red-500 font-semibold">
                    {assignment.status}
                  </td>
                  <td className="border p-2 text-green-600">
                    {assignment.feedback || "No feedback yet"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No submitted assignments found.</p>
      )}
    </div>
  );
};

export default MyAssignments;
