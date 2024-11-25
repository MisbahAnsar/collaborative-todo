interface MainContentProps {
    selectedList: { _id: string; title: string } | null;
    onOpenTaskModal: () => void; // Changed from `onOpenModal` to `onOpenTaskModal` for clarity
}
  
  export const MainContent = ({ selectedList, onOpenTaskModal }: MainContentProps) => {
    return (
      <div className="bg-[#252222] h-full w-full">
        <div className="p-6">
          {selectedList ? (
            <>
                {/* <h1 className="text-white text-2xl">List ID : {selectedList._id}</h1> */}
              <h2 className="text-2xl capitalize font-bold mb-4">{selectedList.title}</h2>
              <div className="flex mb-4">
              <input
                type="text"
                placeholder="  Find task..."
                // value={newTask}
                // onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 mr-2 bg-gray-800 text-white border-gray-700"
        />
              <button
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white"
                onClick={onOpenTaskModal}
              >
                Create Task
              </button>
              </div>
              
            </>
          ) : (
            <p className="text-gray-400">Select a list from the sidebar to view tasks.</p>
          )}
        </div>
      </div>
    );
  };
  