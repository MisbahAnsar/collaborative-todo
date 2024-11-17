import { useState } from "react"
import { api } from "../utils/api"
import { ListTodo } from "lucide-react"

interface User  {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    bio: string; 
}

const Signup = () => {
    const [userData, setUserData] = useState<User>({
        username: "",
        email: "",
        password: "",
        profilePicture: "",
        bio: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const handleSignup = async () => {
        try {
            const response = await api.signup(userData);
            console.log(response);
          } catch (error) {
            console.error("Error during signup:", error);
          }
    };

  return (
    <div className=" flex h-screen text-white">
        <div className="left-side w-1/2 bg-[#181818] p-4 md:p-10 hidden lg:block">
            <h1 className="text-2xl font-semibold flex items-center px-2"><ListTodo />TODOER</h1>
        </div>
        <div className="right-side w-full lg:w-1/2 bg-black relative flex items-center justify-center">
            <h1 className="absolute right-6 top-4 lg:right-10 lg:top-10 text-xl font-thin">
                LOGIN
            </h1>
            <div className="signup-form flex flex-col items-center mx-auto">
                <h1 className="text-white font-bold text-4xl">Create an Account</h1>
                <p className="text-gray-500 font-semibold p-2">Enter the details below to create your account.</p>
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
        value={userData.username}
        onChange={handleChange}
        className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
        required
      />
      {/* email  */}
      <input
        type="email"
        name="email"
        placeholder="  example@gmail.com"
        value={userData.email}
        onChange={handleChange}
        className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
        required
      />
      {/* password */}
      <input
        type="password"
        name="passwor"
        placeholder="  password"
        value={userData.password}
        onChange={handleChange}
        className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
        required
      />
      {/* profilePicture */}
      <input
        type="profilePicture"
        name="profilePicture"
        placeholder="  profilePicture"
        value={userData.profilePicture}
        onChange={handleChange}
        className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
        required
      />
      {/* bio */}
      <input
        type="bio"
        name="bio"
        placeholder="  bio"
        value={userData.bio}
        onChange={handleChange}
        className="p-2 mx-8 rounded-md text-white bg-black border border-gray-600 focus:outline-none"
        required
      />
      <div className="flex justify-end">
      <button
        type="submit"
        className="bg-white hover:bg-blue-600 text-black font-semibold py-2 px-8 mx-8 rounded-md mt-4"
      >
        Sign Up
      </button>
      </div>
      
      

                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup