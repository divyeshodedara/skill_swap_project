import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        // Optionally save the token
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // or wherever after signup
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col justify-between">
      <header className="flex justify-between items-center mb-10 border-b border-white pb-4">
        <h1 className="text-xl">Skill Swap Platform</h1>
        <button className="border border-white rounded-full px-6 py-2">
          Home
        </button>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md text-center">
          <div className="mb-4">
            <label className="block mb-2 text-left">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Create a password"
            />
          </div>

          <button
            className="border border-white rounded-full px-6 py-2 mt-4"
            onClick={handleSignup}
          >
            Signup
          </button>

          {error && <p className="mt-4 text-red-500">{error}</p>}

          <div className="mt-4 text-blue-400">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
