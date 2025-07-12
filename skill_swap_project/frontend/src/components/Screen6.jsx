import React from "react";
import defaultAvatar from "../assets/defaultAvatar.png"; // Avatar for top-right

const mockRequests = [
  {
    name: "Marc Demo",
    profilePhoto: null,
    offeredSkill: "Java Script",
    wantedSkill: "Photoshop",
    rating: 3.9,
    status: "Pending",
  },
  {
    name: "name",
    profilePhoto: null,
    offeredSkill: "SQL",
    wantedSkill: "React",
    rating: 3.9,
    status: "Rejected",
  },
];

export default function Screen6() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white pb-3 mb-6">
        <h1 className="text-xl font-handwriting">Skill Swap Platform</h1>
        <div className="flex items-center gap-4">
          <button className="underline">Home</button>
          <img
            src={defaultAvatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex gap-2 mb-6">
        <select className="bg-black border border-white px-3 py-2">
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
        <input
          type="text"
          className="bg-black border border-white px-3 py-2 w-full"
          placeholder="Search by name or skill"
        />
        <button className="border border-white px-4 py-2">Search</button>
      </div>

      {/* Requests List */}
      {mockRequests.map((req, idx) => (
        <div
          key={idx}
          className="border border-white rounded-xl p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Profile + Info */}
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center text-center text-sm">
              Profile Photo
            </div>
            <div>
              <p className="text-lg font-semibold">{req.name}</p>
              <p className="text-green-400">
                Skills Offered =&gt; {req.offeredSkill}
              </p>
              <p className="text-blue-400">
                Skill Wanted =&gt; {req.wantedSkill}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Rating: {req.rating}/5
              </p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="text-right">
            <p
              className={`font-semibold ${
                req.status === "Rejected"
                  ? "text-red-400"
                  : req.status === "Pending"
                  ? "text-gray-400"
                  : "text-green-400"
              }`}
            >
              Status: {req.status}
            </p>
            {req.status === "Pending" && (
              <div className="flex gap-2 mt-2 justify-end">
                <button className="text-green-400">Accept</button>
                <button className="text-red-400">Reject</button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button className="border px-3 py-1">&lt;</button>
        <button className="border px-3 py-1">1</button>
        <button className="border px-3 py-1">2</button>
        <button className="border px-3 py-1">3</button>
        <button className="border px-3 py-1">&gt;</button>
      </div>
    </div>
  );
}
