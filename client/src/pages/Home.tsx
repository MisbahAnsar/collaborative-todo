import { useState } from "react";
import { CreateList } from "../components/CreateList1";
import { Header } from "../components/Header1";
import { MainContent } from "../components/MainContent";
import { CreateTask } from "../components/CreateTask";

const Home = () => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<{ _id: string; title: string } | null>(null);

  const handleOpenListModal = () => setIsListModalOpen(true);
  const handleCloseListModal = () => setIsListModalOpen(false);

  const handleOpenTaskModal = () => setIsTaskModalOpen(true);
  const handleCloseTaskModal = () => setIsTaskModalOpen(false);

  const handleSelectList = (list: { _id: string; title: string }) => {
    setSelectedList(list);
    setIsListModalOpen(false);
  };

  return (
    <div className="relative h-full text-white">
      <Header onNewListClick={handleOpenListModal} onSelectList={handleSelectList} />

      {/* Main Content */}
      <MainContent
        selectedList={selectedList}
        onOpenTaskModal={handleOpenTaskModal}
      />

      {/* Modals */}
      <CreateList isOpen={isListModalOpen} onClose={handleCloseListModal} />
      <CreateTask isOpen={isTaskModalOpen} onClose={handleCloseTaskModal} listId={selectedList ? (selectedList._id) : null}/>
    </div>
  );
};

export default Home;
