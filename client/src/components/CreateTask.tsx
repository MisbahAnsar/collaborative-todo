import React, { useRef, useState } from "react";
import PriorityDropdown from "./Dropdown";
import { api } from "../utils/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateTask: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleCreateTask = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        alert("Title and description are required.");
        return;
      }

      // Send data to backend
      const response = await api.createTask({
        title,
        content // Assuming tasks will hold the priority value for now
      });

      alert("Task created successfully!");
      console.log("Task created: ", response.data);
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error creating task: ", error);
      alert("Failed to create task.");
    }
  };


  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick} // Add click handler to backdrop
      >
      <div 
        ref={modalRef} 
        className="fixed top-28 w-3/4 h-1/3 max-w-3xl left-1/2 transform -translate-x-1/2 bg-[#252222] p-3 rounded-lg shadow-lg"
      >
        {/* Task input here below is */}
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-none bg-inherit font-semibold placeholder-zinc-300 placeholder:text-xl focus:outline-none caret-white"
          placeholder="Task name" 
          type="text"
        />
        {/* descipriton input below is here  */}
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-inherit placeholder-zinc-400"
          placeholder="description"
          type="text"
        />

        <div className="text-white pt-2">
  <div className="flex gap-2 items-center">
    {[<PriorityDropdown />, "Date"].map((heading, index) => (
      <a
        key={index}
        className="border-2 border-gray-600 px-4 rounded-md"
      >
        {heading}
      </a>
    ))}
  </div>
</div>

        <button
          onClick={onClose}
          className="px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
        <button
            onClick={handleCreateTask}
            className="px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Task
          </button>
      </div>
    </div>
  );
};

export default CreateTask
