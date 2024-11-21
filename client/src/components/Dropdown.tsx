import { useState } from "react"
import { IoClose } from "react-icons/io5";

const PriorityDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

    const options = ["High", "Medium", "Low"];

    const handleSelect = (options: string) => {
        setSelectedOpt(options);
        setIsOpen(false);
    };

    const clearSelection = () => {
        setSelectedOpt(null);
    };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOpt || "Priority"}</span>
        {selectedOpt && (
          <IoClose
            className="ml-2 text-gray-400 cursor-pointer hover:text-white"
            onClick={clearSelection}
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute bg-[#252222] border border-gray-600 rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-3 py-1 cursor-pointer hover:bg-[#1d1f1f] hover:rounded-md"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown


// const Dropdown = () => {
//   return (
//     <div>Dropdown</div>
//   )
// }

// export default Dropdown