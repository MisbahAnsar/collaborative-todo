import { useState } from "react";
import { api } from "../utils/api";
import { ListTodo } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const response = await api.signup(userData);
      toast.success("User created Successfully. Now please Login", {
        position: "bottom-right",
      });
      console.log(response);
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error("User already exists. Please try logging in.", {
          position: "bottom-right",
        });
      }
    }
  };

  const handleLoginbutton = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen text-white">
      {/* Toast Container */}
      <ToastContainer />
      {/* LEFT SIDE */}
      <div className="left-side w-1/2 bg-[#181818] p-4 md:p-10 hidden lg:block">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <ListTodo />
          TODOER
        </h1>
        <div className="absolute left-10 bottom-12">
          <p className="text-xl font-semibold">
            “Join forces to organize, prioritize, and achieve together with{" "}
            <br /> Collaborative Todo — where teamwork meets productivity!”
            <h2 className="font-medium">-Sungjinwoo</h2>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-side w-full lg:w-1/2 bg-black relative flex items-center justify-center">
        <h1
          onClick={handleLoginbutton}
          className="absolute right-6 top-4 lg:right-10 lg:top-10 text-xl font-semibold cursor-pointer"
        >
          LOGIN
        </h1>
        <div className="signup-form flex flex-col items-center mx-auto">
          <h1 className="text-white font-bold text-4xl">Create an Account</h1>
          <p className="text-gray-500 text-lg font-semibold p-2">
            Enter the details below to create your account.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="username"
              name="username"
              placeholder="  username"
              autoComplete="username"
              value={userData.username}
              onChange={handleChange}
              className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
              required
            />
            {/* email */}
            <input
              type="email"
              name="email"
              placeholder="  example@gmail.com"
              autoComplete="username"
              value={userData.email}
              onChange={handleChange}
              className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
              required
            />
            {/* password */}
            <input
              type="password"
              name="password"
              placeholder="  password"
              autoComplete="current-password"
              value={userData.password}
              onChange={handleChange}
              className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-white hover:bg-blue-600 text-black font-semibold py-2 w-full mx-8 rounded-md mt-2"
              >
                Sign Up
              </button>
            </div>
            <p className="text-gray-500 text-md text-center mt-4">
              By clicking continue, you agree to our
              <a href="/" className="text-blue-500 hover:underline">
                {" "}
                Terms <br /> of Service
              </a>{" "}
              and
              <a href="/" className="text-blue-500 hover:underline">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
