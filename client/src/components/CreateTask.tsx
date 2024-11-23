'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { api } from "../utils/api"; // Make sure to have your API handling here.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTask({ isOpen, onClose }: ModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Title and description are required.")
      return
    }

    try {
      const response = await api.createList({
        title,
      })
      console.log("Task created: ", response.data)
      alert("Task created successfully!")
      onClose() // Close modal after task creation
      setTitle('') // Reset fields
      setContent('')
    } catch (error) {
      console.error("Error creating task: ", error)
      alert("Failed to create task.")
    }
  }

  return (
    <>
      {/* Modal */}
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
                />
              </div>

              {/* Priority and Date */}
              <div className="flex gap-2 items-center mb-4">
                {/* Example Priority Dropdown Component */}
                <a className="border-2 border-gray-600 px-4 py-2 rounded-md">
                  Priority
                </a>
                <a className="border-2 border-gray-600 px-4 py-2 rounded-md">
                  Date
                </a>
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
  )
}
