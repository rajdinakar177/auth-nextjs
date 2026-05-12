"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      toast.success("Login successful 🎉");

      setTimeout(() => {
        router.push("/profile");
      }, 1000);

    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");

    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">

      <Toaster />

      <div className="bg-black rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-white-800 mb-6">
          {loading ? "Loading..." : "Login"}
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full py-2 rounded-lg transition duration-200 
    ${buttonDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          Login
        </button>


        <p className="text-center text-sm text-white-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className={`text-blue-600 hover:underline ${buttonDisabled ? "pointer-events-none opacity-50" : ""}`}>
            Sign up
          </Link>
        </p>
        <div className=" text-center mt-4">
          <Link href="/forgotpassword" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

      </div>
    </div>
  );
}