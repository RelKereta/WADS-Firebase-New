import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, deleteToDo, editToDo }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
      <p
        className={`cursor-pointer text-lg ${task.completed ? "line-through text-gray-500" : "text-black"}`}
        onClick={() => toggleComplete(task.id, task.completed)}
      >
        {task.task}
      </p>

      <div className="flex gap-3">
        {/* Complete Task Button */}
        <FontAwesomeIcon
          icon={faCheck}
          className={`cursor-pointer ${task.completed ? "text-green-400" : "text-gray-400"} hover:text-green-600`}
          onClick={() => toggleComplete(task.id, task.completed)}
        />

        {/* Edit Button */}
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-yellow-500 cursor-pointer hover:text-yellow-600"
          onClick={() => editToDo(task.id, task.task)}
        />

        {/* Delete Button */}
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer hover:text-red-600"
          onClick={() => deleteToDo(task.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
