import { useState } from "react";
import { CreateList } from "../components/CreateList1";
import { Header } from "../components/Header1";
import { MainContent } from "../components/MainContent";
import { CreateTask } from "../components/CreateTask";

const Home = () => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<{ id: number; title: string } | null>(null);

  const handleOpenListModal = () => setIsListModalOpen(true);
  const handleCloseListModal = () => setIsListModalOpen(false);

  const handleOpenTaskModal = () => setIsTaskModalOpen(true);
  const handleCloseTaskModal = () => setIsTaskModalOpen(false);

  const handleSelectList = (list: { id: number; title: string }) => {
    setSelectedList(list);
  };

  return (
    <div className="relative h-screen text-white">
      <Header onNewListClick={handleOpenListModal} onSelectList={handleSelectList} />

      {/* Main Content */}
      <MainContent
        selectedList={selectedList}
        onOpenTaskModal={handleOpenTaskModal}
      />

      {/* Modals */}
      <CreateList isOpen={isListModalOpen} onClose={handleCloseListModal} />
      <CreateTask isOpen={isTaskModalOpen} onClose={handleCloseTaskModal} />
    </div>
  );
};

export default Home;
