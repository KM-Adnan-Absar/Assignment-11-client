import { useState, useEffect, useContext } from "react";
import AssignmentCard from "./AssignmentCard";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AssignmentsPage = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
const navigate = useNavigate()
  // Fetch assignments
  useEffect(() => {
    fetch("http://localhost:3000/assignments")
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Handle Create Assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const assignmentData = {
      title,
      marks,
      thumbnail,
      difficulty,
      createdBy: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "No Email",
      },
    };

    try {
      const response = await fetch("http://localhost:3000/create-assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentData),
      });

      if (response.ok) {
        Swal.fire("Success!", "Assignment Created Successfully!", "success");
        e.target.reset(); // Reset form
        // Fetch the updated assignments list
        fetch("http://localhost:3000/assignments")
          .then((res) => res.json())
          .then((data) => setAssignments(data));
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  // Handle Delete Assignment
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/assignments/${id}?email=${user.email}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            setAssignments(assignments.filter((assignment) => assignment._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
        
      } else {
        Swal.fire("Error!", data.message, "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">All Assignments</h1>

      {/* Create Assignment Form */}
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input type="text" className="input w-full" onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Marks</label>
            <input type="number" className="input w-full" onChange={(e) => setMarks(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Thumbnail URL</label>
            <input type="text" className="input w-full" onChange={(e) => setThumbnail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Difficulty</label>
            <select className="select w-full" onChange={(e) => setDifficulty(e.target.value)} required>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full">Create Assignment</button>
        </form>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((assignment) => (
        <AssignmentCard
        key={assignment._id}
        assignment={assignment}
        onDelete={handleDelete}
        onUpdate={() => navigate(`/update-assignment/${assignment._id}`)}
      />
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;
