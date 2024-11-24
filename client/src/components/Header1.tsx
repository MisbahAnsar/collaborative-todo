import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import Sidebar from "../components/Sidebar1";
import { api } from "../utils/api";
import { BsLayoutSidebar } from "react-icons/bs";

interface HeaderProps {
  onNewListClick: () => void;
  onSelectList: (list: { id: number; title: string }) => void;
}

export function Header({ onNewListClick, onSelectList }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await api.getUsername();
        setUsername(response?.data.username || "Guest");
      } catch (error) {
        console.error("Error fetching username: ", error);
        setUsername("Guest");
      }
    };
    fetchUsername();
  }, []);

  return (
    <header className="relative bg-[#1B1A1A] border-b border-gray-700 p-4 flex items-center text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewListClick={onNewListClick}
        onSelectList={onSelectList} // Pass the prop
      />

      <div className="flex items-center space-x-4">
        <button onClick={handleSidebarToggle} className="text-white">
          <BsLayoutSidebar className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Todoer</h1>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <span className="text-white text-sm font-medium">
          {username ? `Welcome, ${username}` : "Loading..."}
        </span>
        <button
          id="hello"
          className="flex items-center p-1 bg-orange-400 hover:bg-orange-500 rounded-md"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add Team
        </button>
      </div>
    </header>
  );
}
