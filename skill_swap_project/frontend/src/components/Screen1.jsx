import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/defaultAvatar.png";

const users = [
  {
    name: "Marc Demo",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    rating: 3.9,
  },
  {
    name: "Michell",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    rating: 2.5,
  },
  {
    name: "Joe wills",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    rating: 4.0,
  },
];

export default function Screen1() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white pb-3 mb-6">
        <h1 className="text-xl font-handwriting">Skill Swap Platform</h1>
        <Link
          to="/"
          className="border px-4 py-1 rounded-full border-white text-white"
        >
          Login
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 mb-6">
        <select className="bg-black border border-white px-3 py-2 text-white">
          <option>Availability</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>
        <input
          type="text"
          className="bg-black border border-white px-3 py-2 flex-1"
          placeholder="Search..."
        />
        <button className="border border-white px-4 py-2 rounded text-white">
          Search
        </button>
      </div>

      {/* User Cards */}
      {users.map((user, index) => (
        <div
          key={index}
          className="flex justify-between items-center border border-white rounded-xl p-4 mb-4 flex-wrap"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-center">
              Profile Photo
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-green-400">
                Skills Offered ⇒ {user.skillsOffered.join(", ")}
              </p>
              <p className="text-blue-400">
                Skill Wanted ⇒ {user.skillsWanted.join(", ")}
              </p>
              <p className="text-gray-400 mt-1">Rating: {user.rating}/5</p>
            </div>
          </div>
          <button className="bg-blue-900 px-4 py-2 rounded text-white mt-4 md:mt-0">
            Request
          </button>
        </div>
      ))}

      {/* Pagination */}
      <div className="text-center text-white mt-6 space-x-4">
        <button>{"<"}</button>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button
            key={n}
            className="px-2 py-1 border border-white rounded-full"
          >
            {n}
          </button>
        ))}
        <button>{">"}</button>
      </div>
    </div>
  );
}
