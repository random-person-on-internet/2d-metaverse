import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import React, { useState } from "react";
import { login } from "../api/authApi";
import { getMe } from "../api/userApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const setToken = useUserStore((s) => s.setToken);
  const setUser = useUserStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { Token } = await login({ email, password });
      setToken(Token);

      const user = await getMe(Token);
      setUser(user);

      navigate("/worlds");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#121212] text-[#eeeeee]">
        <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-[#00adb5]">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 rounded bg-[#222831] text-[#eeeeee] border border-[#00adb5] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 rounded bg-[#222831] text-[#eeeeee] border border-[#00adb5] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-[#00adb5] text-[#121212] font-bold rounded hover:bg-[#00c5cc] transition"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#888]">
            Don&apos;t have an account?{" "}
            <span
              className="text-[#00adb5] cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
