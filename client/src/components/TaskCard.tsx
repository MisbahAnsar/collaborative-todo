import { useState } from 'react'
import { CheckCircle, Circle, AlertCircle, Calendar, User } from 'lucide-react'

interface TaskProps {
  id: string
  title: string
  content: string
  completed: boolean
  assignedBy: { id: string; name: string }
  assignedTo: { id: string; name: string }
  priority: 'low' | 'medium' | 'high'
  dueDate: Date
  onToggleComplete: (id: string) => void
}

export function TaskCard({
  id,
  title,
  content,
  completed,
  assignedBy,
  assignedTo,
  priority,
  dueDate,
  onToggleComplete
}: TaskProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  }

  const priorityIcons = {
    low: <AlertCircle className="h-4 w-4" />,
    medium: <AlertCircle className="h-4 w-4" />,
    high: <AlertCircle className="h-4 w-4" />
  }
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-GB'); // Converts ISO string to dd,mm,yyyy


  return (
    <div className="bg-[#2A2727] rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggleComplete(id)}
            className="mt-1 text-gray-400 hover:text-orange-400 transition-colors duration-200"
          >
            {completed ? (
              <CheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          <div>
            <h3 className={`text-lg font-semibold ${completed ? 'text-gray-500 line-through' : 'text-white'}`}>
              {title}
            </h3>
            <p className={`text-sm ${completed ? 'text-gray-500' : 'text-gray-300'} mt-1`}>
              {isExpanded ? content : `${content.slice(0, 100)}${content.length > 100 ? '...' : ''}`}
            </p>
            {content.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-orange-400 hover:text-orange-500 text-sm mt-1 focus:outline-none"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
        <div className={`flex items-center ${priorityColors[priority]}`}>
          {priorityIcons[priority]}
          <span className="ml-1 text-sm capitalize">{priority}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Due Date: {formattedDueDate}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>Assigned to: {assignedTo.name}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-400">
        <span>Assigned by: {assignedBy.name}</span>
      </div>
    </div>
  )
}

