import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AssignmentPage = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
 

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
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
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
      <div className="space-x-2 text-center mt-4">
        <button className="btn bg-orange-500">Update</button>
        <button className="btn bg-red-600">Delete</button>
        <button className="btn bg-green-400">View Assignment</button>
      </div>
    </div>
  );
};

export default AssignmentPage;
