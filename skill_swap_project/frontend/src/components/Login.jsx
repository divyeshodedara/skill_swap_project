import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Optionally save token and redirect
      localStorage.setItem("token", data.token);
      navigate("/profile"); // Redirect after login
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md text-center"
        >
          <div className="mb-4 text-left">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="border border-white rounded-full px-6 py-2 mt-4"
          >
            Login
          </button>

          <div className="mt-4 text-blue-400">
            <Link to="/forgot-password">Forgot username/password</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
