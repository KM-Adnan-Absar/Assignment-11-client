// src/pages/AssignmentDetailsPage.jsx
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import SubmissionModal from "../pages/SubmissionModal";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [assignment, setAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);

//   View Assignment 
  useEffect(() => {
    fetch(`https://assignment-11-server-orcin-rho.vercel.app/assignments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((error) =>
        console.error("Error fetching assignment details:", error)
      );
  }, [id]);

  if (!assignment) {
    return <div className="text-center mt-36"><span className="loading loading-ring loading-xs"></span>
    <span className="loading loading-ring loading-sm"></span>
    <span className="loading loading-ring loading-md"></span>
    <span className="loading loading-ring loading-lg"></span></div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Assignment Details</h1>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold">{assignment.title}</h2>
        <p><strong>Marks:</strong> {assignment.marks}</p>
        <p><strong>Difficulty:</strong> {assignment.difficulty}</p>
        <img
          src={assignment.thumbnail}
          alt={assignment.title}
          className="w-full h-60 object-cover rounded my-4"
        />
        <p>
          <strong>Created by:</strong> {assignment.createdBy.name} (
          {assignment.createdBy.email})
        </p>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Take Assignment
      </button>

      {showModal && (
        <SubmissionModal
          assignmentId={assignment._id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AssignmentDetails;
