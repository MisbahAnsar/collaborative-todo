import { useState } from "react";
import { CreateTask }  from "../components/CreateTask";
import { Header } from "../components/Header1";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative h-screen text-white">
      {/* Pass handleOpenModal to Header */}
      <Header onNewListClick={handleOpenModal} />

      {/* Main Content */}
      <div className="bg-[#252222] h-full w-full">
        <div className="p-4">Main Content</div>
      </div>

      {/* Task Modal */}
      <CreateTask isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
