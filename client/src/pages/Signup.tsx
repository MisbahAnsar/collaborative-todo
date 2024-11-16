import { useEffect, useState } from "react"
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
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: "",
        bio: "",
    })
    
    const handleSignup = async () => {
        try {
            const response = await api.signup(userData);
            console.log(response);
          } catch (error) {
            console.error("Error during signup:", error);
          }
    };

    useEffect(() => {
        handleSignup()
    },[])

  return (
    <div className=" flex h-screen text-white">
        <div className="left-side w-1/2 bg-[#181818] p-4 md:p-10 hidden lg:block">
            <h1 className="text-2xl font-semibold flex items-center px-2"><ListTodo />TODOER</h1>
        </div>
        <div className="right-side w-full lg:w-1/2 bg-black">
            <h1 className="absolute right-6 top-4 lg:right-10 lg:top-10 text-xl font-thin">LOGIN</h1>
        </div>
    </div>
  )
}

export default Signup