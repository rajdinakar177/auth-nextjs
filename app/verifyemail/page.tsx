"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Verifying your email...");

  const [token, setToken] = useState<string | null>(null);

  // Get token safely (client-only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

  // Verify email
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setMessage("Invalid verification link");
          setSuccess(false);
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/users/verifyemail", {
          token,
        });

        setSuccess(true);
        setMessage(response.data.message || "Email verified successfully 🎉");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error: any) {
        setSuccess(false);
        setMessage(
          error?.response?.data?.error ||
            "Something went wrong while verifying email"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8 text-center">

        {/* Icon */}
        <div className="mb-6">
          {loading ? (
            <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : success ? (
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-500/20 text-green-400 text-3xl">
              ✓
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-500/20 text-red-400 text-3xl">
              ✕
            </div>
          )}
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white mb-3">
          {loading
            ? "Verifying Email"
            : success
            ? "Verification Successful"
            : "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        {!loading && (
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
            >
              Go to Login
            </Link>

            {!success && (
              <Link
                href="/signup"
                className="w-full border border-gray-700 hover:bg-gray-800 text-gray-300 py-3 rounded-xl font-medium"
              >
                Back to Signup
              </Link>
            )}
          </div>
        )}

        {/* Redirect info */}
        {success && !loading && (
          <p className="text-xs text-gray-500 mt-5">
            Redirecting to login in 3 seconds...
          </p>
        )}
      </div>
    </div>
  );
}