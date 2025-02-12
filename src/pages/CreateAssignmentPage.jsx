import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      title,
      description,
      marks,
      thumbnail,
      difficulty,
      dueDate: dueDate.toISOString(), 
      createdBy: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "No Email",
      },
    };

    try {
      const response = await fetch("https://assignment-11-server-orcin-rho.vercel.app/create-assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentData),
      });

      if (response.ok) {
        Swal.fire("Success!", "Assignment Created Successfully!", "success");
        e.target.reset(); 
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input type="text" className="input w-full" onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea className="textarea w-full" onChange={(e) => setDescription(e.target.value)} required></textarea>
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

        <div className="mb-4">
          <label className="block font-medium">Due Date</label>
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="input w-full" />
        </div>

        <button type="submit" className="btn btn-primary w-full">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignment;
