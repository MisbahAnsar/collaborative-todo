import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-[#181818] h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-32 lg:flex items-center justify-between">
        <div className="">
          <h1 className="text-[1.7rem] text-4xl font-bold max-w-2xl lg:max-w-xl">
            Collaborate seamlessly and manage tasks together in real-time.
          </h1>
          <button
            onClick={handleSignup}
            className="my-6 px-3 flex items-center gap-2 py-2 bg-orange-600 text-white text-2xl font-semibold border rounded-full"
          >
            Get Started
            <ArrowUpRight className="text-white" />
          </button>
        </div>
        <div className="colorgreen py-6">
          <h1 className="bg-green-400 border rounded-2xl w-full lg:w-[72vh] h-56 sm:h-80"></h1>
        </div>
      </div>
    </div>
  );
};

export default Landing;
