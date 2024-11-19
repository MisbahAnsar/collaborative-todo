import { useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen text-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#181818] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 z-50`}
      >
        <button
          className="absolute right-0 p-4 mt-4 mx-4"
          onClick={() => setIsOpen(false)}
        >
          <BsLayoutSidebar />
        </button>
        <div className="p-4">Sidebar Content</div>
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
