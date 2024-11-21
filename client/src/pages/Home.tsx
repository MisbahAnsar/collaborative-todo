import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { api } from "../utils/api";

interface username {
  username: string
}
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ username, setUsername ] = useState<username | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
      const handleUsername = async () => {
        try{
          const response = await api.getUsername();
          setUsername(response?.data.username);
        } catch (error){
          console.error("error fetching username: ", error);
        }
      }
      handleUsername();
    }, [])

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
        <div className="p-6 capitalize font-semibold flex items-center text-lg space-x-2">{username ? `${username}` : "Loading user details..."}</div>
        <div className="grid grid-rows-4 gap-4 p-2 text-start">
  <div className="text-white px-4 rounded-md cursor-pointer">
    Option 1
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
        <button
          className="m-4 p-4"
          onClick={() => setIsOpen(true)}
        >
          <BsLayoutSidebar />
        </button>
        <div className="p-4">Main Content</div>
      </div>
    </div>
  );
};

export default Home;
