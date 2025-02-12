import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const UpdateAssignmentPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get the assignment ID from the URL params
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [title, setTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

useEffect(() => {
  fetch(`https://assignment-11-server-orcin-rho.vercel.app/assignments/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched assignment data:", data); // Check the response data
      if (data) {
        setAssignment(data); // Make sure the response data is not undefined
        setTitle(data.title);
        setMarks(data.marks);
        setThumbnail(data.thumbnail);
        setDifficulty(data.difficulty);
      } else {
        console.error("Assignment data is empty or undefined");
      }
    })
    .catch((error) => console.error("Error fetching assignment:", error));
}, [id]);



  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedAssignment = {
      title,
      marks,
      thumbnail,
      difficulty,
    };

    try {
      const response = await fetch(`https://assignment-11-server-orcin-rho.vercel.app/updateAssignment/${id}?email=${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAssignment),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire("Success!", "Assignment Updated Successfully!", "success");
        navigate("/");
      } else {
        Swal.fire("Error!", data.message, "error");
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Update Assignment</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input type="text" className="input w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Marks</label>
          <input type="number" className="input w-full" value={marks} onChange={(e) => setMarks(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Thumbnail URL</label>
          <input type="text" className="input w-full" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Difficulty</label>
          <select className="select w-full" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full">Update Assignment</button>
      </form>
    </div>
  );
};

export default UpdateAssignmentPage;