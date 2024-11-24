interface MainContentProps {
    selectedList: { id: number; title: string } | null;
    onOpenTaskModal: () => void; // Changed from `onOpenModal` to `onOpenTaskModal` for clarity
  }
  
  export const MainContent = ({ selectedList, onOpenTaskModal }: MainContentProps) => {
    return (
      <div className="bg-[#252222] h-full w-full">
        <div className="p-6">
          {selectedList ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedList.title}</h2>
              <button
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white"
                onClick={onOpenTaskModal} // Open task modal
              >
                Create Task
              </button>
            </>
          ) : (
            <p className="text-gray-400">Select a list from the sidebar to view tasks.</p>
          )}
        </div>
      </div>
    );
  };
  