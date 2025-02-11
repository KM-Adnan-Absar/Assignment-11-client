const AssignmentCard = ({ assignment, onDelete, onUpdate }) => {
    return (
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col">
        <img src={assignment.thumbnail} alt={assignment.title} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-lg font-bold mt-2">{assignment.title}</h2>
        <p className="text-sm text-gray-500">Marks: {assignment.marks}</p>
        <p className="text-sm text-gray-500">Difficulty: {assignment.difficulty}</p>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => onUpdate(assignment)}>Update</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(assignment.id)}>Delete</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded">View</button>
        </div>
      </div>
    );
  };
  export default AssignmentCard;
  