import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-black text-white">
      <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
      <div className="flex items-center gap-2">
        <select className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white">
          <option>Availability</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
        />
        <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-1 rounded text-white">
          Search
        </button>
        <button className="border border-white px-4 py-1 rounded text-white ml-2">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
