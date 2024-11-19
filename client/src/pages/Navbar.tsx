import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-semibold">TODOER</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {["Home", "About", "Services", "Contact", "Join"].map(
              (heading, index) => (
                <a
                  key={index}
                  href={`#${heading.toLowerCase()}`}
                  className={`hover:underline px-3 py-1 rounded-md ${
                    index === 4
                      ? "border-2 rounded-3xl px-5"
                      : "border-none"
                  }`}
                >
                  {heading}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-32 sm:w-40 rounded-tl-xl rounded-bl-xl bg-orange-500 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg md:hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-16 space-y-4 text-center">
          {["Home", "About", "Services", "Contact"].map((heading, index) => (
            <a
              key={index}
              href={`#${heading.toLowerCase()}`}
              className="block text-white hover:underline px-4 py-1 rounded-md"
            >
              {heading}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
