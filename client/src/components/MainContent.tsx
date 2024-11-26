import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { TaskCard } from './TaskCard'; // Import the TaskCard component

interface MainContentProps {
  selectedList: { _id: string; title: string } | null;
  onOpenTaskModal: () => void;
}

export const MainContent = ({ selectedList, onOpenTaskModal }: MainContentProps) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTaskComplete = async (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    if (!selectedList) return;

    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.getTasks(selectedList._id);
        setTasks(response.tasks || []);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedList]);

  return (
    <div className="bg-[#252222] h-screen w-full flex justify-center">
      <div className="p-6 max-w-7xl w-full">
        {selectedList ? (
          <>
            <h2 className="text-2xl capitalize font-bold mb-4">{selectedList.title}</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="  Find task..."
                className="flex-1 mr-2 rounded-md bg-gray-800 text-white border-gray-700"
              />
              <button
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white"
                onClick={onOpenTaskModal}
              >
                Create Task
              </button>
            </div>

            {loading ? (
              <p className="text-gray-400">Loading tasks...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    content={task.content}
                    completed={task.completed}
                    assignedBy={{
                      id: task.assignedBy?._id || "",
                      name: task.assignedBy?.username || "Unknown",
                    }}
                    assignedTo={{
                      id: task.assignedTo?._id || "",
                      name: task.assignedTo?.username || "Unknown",
                    }}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    onToggleComplete={toggleTaskComplete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 h-screen">No tasks found for this list.</p>
            )}
          </>
        ) : (
          <p className="text-gray-400 h-screen">Select a list from the sidebar to view tasks.</p>
        )}
      </div>
    </div>
  );
};
