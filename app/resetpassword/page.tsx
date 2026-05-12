"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
const searchParams = useSearchParams();

useEffect(() => {
  const token = searchParams?.get("token");
}, [searchParams]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(
    "Verifying your reset password link..."
  );
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  // Verify token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("Invalid reset password link");
          setSuccess(false);
          return;
        }

        const response = await axios.post(
          "/api/users/verifyresettoken",
          { token }
        );

        setSuccess(true);
        setMessage(
          response.data.message || "Reset password link is valid 🎉"
        );
      } catch (error: any) {
        setSuccess(false);

        setMessage(
          error?.response?.data?.error ||
            "Reset password link expired or invalid"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams]);

  // Update password
  const ResetPassword = async () => {
    try {
      setUpdating(true);

      const token = searchParams.get("token");

      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      alert(response.data.message || "Password updated successfully 🎉");

      router.push("/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
          "Something went wrong while updating password"
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {loading
            ? "Verifying your reset password link..."
            : success
            ? "Reset Password"
            : "Invalid Reset Password Link"}
        </h2>

        {/* Message */}
        {!loading && (
          <p className="text-center text-gray-400 mb-6">
            {message}
          </p>
        )}

        {/* Password Form */}
        {!loading && success && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                New Password
              </label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={ResetPassword}
              disabled={updating || password.length < 6}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-xl transition duration-200"
            >
              {updating ? "Updating Password..." : "Update Password"}
            </button>
          </>
        )}

        {/* Back to login */}
        {!loading && (
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-blue-400 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}