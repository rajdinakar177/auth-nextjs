"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function SignUpPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successful 🎉");
            console.log("Signup success", response.data);

            // redirect to login page after success
            router.push("/pages/login");

        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong");
            console.log("Signup failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
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
      {loading ? "Processing..." : "Create Account"}
    </h1>

    {/* Username */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-white-600 mb-1">
        Username
      </label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
        placeholder="Enter your username"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-sm font-medium white-gray-600 mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
        placeholder="Enter your email"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-white-600 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
        placeholder="Enter your password"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Button */}
    <button
      disabled={buttonDisabled || loading}
      onClick={onSignup}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
    >
      {loading ? "Processing..." : "Sign Up"}
    </button>

    {/* Login link */}
    <p className="text-center text-sm text-white-600 mt-4">
      Already have an account?{" "}
      <Link href="/pages/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>

  </div>
</div>
    )
}