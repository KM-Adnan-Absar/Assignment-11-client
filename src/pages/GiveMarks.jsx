import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const GiveMarks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get logged-in user
  const [assignment, setAssignment] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await fetch(`https://assignment-11-server-orcin-rho.vercel.app/submitAssignment/${id}`);
        const data = await response.json();
        setAssignment(data);
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };

    fetchAssignmentDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marks || !feedback) {
      alert("Please fill in both marks and feedback.");
      return;
    }

    try {
      const response = await fetch(`https://assignment-11-server-orcin-rho.vercel.app/updateAssignment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obtainedMarks: marks,
          feedback: feedback,
          status: "Completed",
        }),
      });

      if (response.ok) {
        alert("Marks submitted successfully!");
        navigate("/submitted-assignments"); // Redirect to assignments page
      } else {
        alert("Error submitting marks.");
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  if (!assignment) return <p>Loading...</p>;

  // ❌ Prevent user from marking their own assignment
  const isOwnAssignment = user?.email === assignment.userEmail;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Give Marks</h2>

      <div className="border p-4 rounded shadow">
        <p><strong>Title:</strong> {assignment.title}</p>
        <p><strong>Examinee:</strong> {assignment.userEmail}</p>
        <p><strong>Total Marks:</strong> {assignment.totalMarks}</p>
        <p><strong>Notes:</strong> {assignment.notes}</p>
        <p>
          <strong>Google Docs:</strong>{" "}
          <a href={assignment.googleDocsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Open Document
          </a>
        </p>
      </div>

      {isOwnAssignment ? (
        <p className="mt-4 text-red-500 font-bold">
          ❌ You cannot mark your own assignment.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-2">
            <label className="block font-bold">Marks:</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block font-bold">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Marks
          </button>
        </form>
      )}
    </div>
  );
};

export default GiveMarks;
