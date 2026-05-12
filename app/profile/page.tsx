"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};
export default function ProfilePage() {
  const router = useRouter()


  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log("User data:", res.data);
        setUser(res.data.user);
      } catch (error) {
        toast.error("Failed to fetch user");
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout")
      toast.success("Logout successful 🎉");
      router.push("/login")
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      <div className=" border shadow-lg rounded-2xl p-6 w-80 text-center">

        {/* Profile Image */}
        <div className="flex justify-center bg-white">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-semibold mt-4">{user?.username}</h2>
        <p className="text-gray-500">{user?.email}</p>

        {/* Buttons */}
        <div className="mt-4 flex gap-2 justify-center">

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={logout}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}