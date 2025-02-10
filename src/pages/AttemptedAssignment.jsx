import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const SubmittedAssignments = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      try {
        const response = await fetch("http://localhost:3000/submitAssignment");
        const data = await response.json();

        // Show only submitted assignments (status: "Submitted")
        const submittedAssignments = data.filter(
          (assignment) => assignment.status === "Submitted"
        );

        setAssignments(submittedAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchSubmittedAssignments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Assignments</h2>

      {assignments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Examinee Name</th>
                <th className="border p-2">Total Marks</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
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
                  <td className="border p-2">
                    <button
                      onClick={() => navigate(`/give-marks/${assignment._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Give Mark
                    </button>
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

export default SubmittedAssignments;
