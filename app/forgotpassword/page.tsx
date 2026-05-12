"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Email validation
  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setButtonDisabled(!isValidEmail);
  }, [email]);

  // Send reset password email
  const onForgotPassword = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/forgotpassword",
        {
          email,
        }
      );

      toast.success(
        response.data.message ||
          "Password reset link sent to your email 🎉"
      );

      // Redirect after success
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          "Failed to send password reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">

      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Enter your email to receive a password reset link.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email Address
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onForgotPassword}
          disabled={buttonDisabled || loading}
          className={`w-full py-3 rounded-xl font-medium transition duration-200
          ${
            buttonDisabled || loading
              ? "bg-gray-700 cursor-not-allowed text-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Sending Reset Link..." : "Send Reset Link"}
        </button>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}