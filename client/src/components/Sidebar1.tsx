import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { BsLayoutSidebar } from "react-icons/bs";
import { api } from "../utils/api"; // Import your getLists function

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewListClick: () => void;
  onSelectList: (list: { _id: string; title: string }) => void;
}

const Sidebar = ({ isOpen, onClose, onNewListClick, onSelectList }: SidebarProps) => {
  const [lists, setLists] = useState<{ _id: string; title: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the lists when the component mounts
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await api.getLists(); // Get the lists from the API
        setLists(response.data.lists); // Assuming the API returns the lists in a 'lists' property
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    if (isOpen) {
      fetchLists(); // Fetch lists when sidebar is opened
    }
  }, [isOpen]); // Re-fetch when the sidebar is opened

  const filteredLists = lists.filter((list) =>
    list.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#1B1A1A] transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 z-50 flex flex-col`}
    >
      {/* Close button */}
      <button className="absolute right-0 p-4 mt-4 mx-4" onClick={onClose}>
        <BsLayoutSidebar />
      </button>

      {/* Search Input */}
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search lists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
      </div>

      {/* New List Button */}
      <button
        className="m-4 p-2 flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white rounded"
        onClick={onNewListClick}
      >
        <Plus className="h-4 w-4 mr-2" /> New List
      </button>

      {/* List of Items */}
      <div className="flex-1 overflow-y-auto px-4">
        {filteredLists.length === 0 ? (
          <p className="text-gray-400">No lists found</p>
        ) : (
          filteredLists.map((list) => (
            <button
              key={list._id}
              className="w-full text-left p-2 hover:bg-gray-800 rounded text-white"
              onClick={() => onSelectList(list)}
            >
              {list.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
