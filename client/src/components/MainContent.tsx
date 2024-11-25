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

    // Optionally, you can also make an API call here to update the task completion status on the server.
    // try {
    //   await api.updateTaskStatus(id, { completed: !tasks.find((task) => task._id === id)?.completed });
    // } catch (err) {
    //   console.error('Failed to update task status', err);
    //   setError('Error toggling task status.');
    // }
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
    <div className="bg-[#252222] h-full w-full flex justify-center">
      <div className="p-6 max-w-7xl w-full">
        {selectedList ? (
          <>
            <h2 className="text-2xl capitalize h-auto font-bold mb-4">{selectedList.title}</h2>
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
                    assignedBy={task.assignedBy}
                    assignedTo={task.assignedTo}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    onToggleComplete={toggleTaskComplete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No tasks found for this list.</p>
            )}
          </>
        ) : (
          <p className="text-gray-400">Select a list from the sidebar to view tasks.</p>
        )}
      </div>
    </div>
  );
};
