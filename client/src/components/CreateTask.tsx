'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { api } from '../utils/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  listId: string | null; // Accept listId as a prop (can be null initially)
}

export function CreateTask({ isOpen, onClose, listId }: ModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority
  const [dueDate, setDueDate] = useState<string>(''); // ISO date string
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listId) {
      alert('Error: No list selected. Please select a valid list to add the task.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('Title and description are required.');
      return;
    }

    try {
      const taskData = {
        title,
        content,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined, // Only send if set
        completed: false, // Default value
        assignedTo: 'some-user-id', // Replace with dynamic user ID
      };

      // Call API to create the task under the specified listId
      const response = await api.createTask(listId, taskData);

      alert('Task created successfully!');
      onClose();
      setTitle('');
      setContent('');
      setPriority('medium');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task: ', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-[#1B1A1A] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Create New Task</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Title input */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              {/* Content input */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter task description"
                  required
                />
              </div>

              {/* Priority input */}
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Due Date input */}
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
