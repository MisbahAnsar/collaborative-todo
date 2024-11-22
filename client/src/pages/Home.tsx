import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { api } from "../utils/api";
import CreateTask from "../components/CreateTask";
import { Plus, Search } from 'lucide-react'

interface username {
  username: string;
}
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<username | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [lists, setLists] = useState([
  //   { id: 1, title: 'Work' },
  //   { id: 2, title: 'Personal' },
  //   { id: 3, title: 'Projects' },
  // ])

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const handleUsername = async () => {
      try {
        const response = await api.getUsername();
        setUsername(response?.data.username);
      } catch (error) {
        console.error("error fetching username: ", error);
      }
    };
    handleUsername();
  }, []);

// 
  // const filteredLists = lists.filter(list =>
  //   list.title.toLowerCase().includes(searchTerm.toLowerCase())
  // )
// 
  return (
    <div className="relative h-screen text-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1B1A1A] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 z-50`}
      >
        <button
          className="absolute right-0 p-4 mt-4 mx-4"
          onClick={() => setIsOpen(false)}
        >
          <BsLayoutSidebar />
        </button>
        <div className="py-6 px-5 capitalize font-semibold flex items-center text-lg space-x-2">
          {/* {username ? `${username}` : "Loading user details..."} */}
          {/* <div className=""> */}
        {/* <input
          type="text"
          placeholder="   Search lists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-44 p-1 rounded-md bg-gray-800 text-white border-gray-700"
          icon={<Search className="h-4 w-4 text-gray-400" />}
        /> */}
      </div>

        </div>
        <div className="grid grid-rows-4 gap-4 px-2 text-start text-xl">
          <div
            onClick={handleOpenModal}
            className="text-red-300 px-4 gap-2 rounded-md cursor-pointer flex items-center"
          >
            <Plus className="bg-orange-500 rounded-full text-black w-5 h-5" />
            New List
          </div>
          <div className="text-white px-4 rounded-md cursor-pointer">
            Option 2
          </div>
          <div className="text-white px-4 rounded-md cursor-pointer">
            Option 3
          </div>
          <div className="text-white px-4 rounded-md cursor-pointer">
            Option 4
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#252222] h-full w-full">
        <button className="m-4 p-4" onClick={() => setIsOpen(true)}>
          <BsLayoutSidebar />
        </button>
        <div className="p-4">Main Content</div>
      </div>
      <CreateTask isOpen={isModalOpen} onClose={handleCloseModal}></CreateTask>
    </div>
  );
};

export default Home;
