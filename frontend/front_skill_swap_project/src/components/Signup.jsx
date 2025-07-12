import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
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
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-left">Email</label>
            <input
              type="email"
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-left">Password</label>
            <input
              type="password"
              className="w-full bg-black border border-white px-4 py-2 rounded"
              placeholder="Create a password"
            />
          </div>

          <button className="border border-white rounded-full px-6 py-2 mt-4">
            Signup
          </button>

          <div className="mt-4 text-blue-400">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
