// src/components/SubmissionModal.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const SubmissionModal = ({ assignmentId, onClose }) => {
  const { user } = useContext(AuthContext);
  const [docsLink, setDocsLink] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      assignmentId,
      docsLink,
      note,
      status: "pending", // default status
      submittedBy: {
        email: user.email,
        name: user.displayName || "Anonymous",
      },
    };

    try {
      const response = await fetch("http://localhost:3000/submit-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire("Success", "Assignment submitted successfully!", "success");
        onClose();
      } else {
        Swal.fire("Error", data.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Google Docs Link</label>
            <input
              type="url"
              className="input w-full"
              placeholder="https://docs.google.com/..."
              value={docsLink}
              onChange={(e) => setDocsLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Quick Note</label>
            <textarea
              className="textarea w-full"
              placeholder="Enter a quick note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionModal;
