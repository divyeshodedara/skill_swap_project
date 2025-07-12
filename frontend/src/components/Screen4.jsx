import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/defaultAvatar.png"; // Make sure this exists

export default function Screen4() {
  const user = {
    name: "Marc Demo",
    skillsOffered: ["Graphic Design", "Photoshop"],
    skillsWanted: ["Python", "Team Management"],
    profilePhoto: null, // can be replaced with real image URL later
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white pb-3 mb-6">
        <h1 className="text-xl font-handwriting">Skill Swap Platform</h1>
        <div className="flex items-center gap-4">
          <button className="underline">Swap request</button>
          <button className="underline">Home</button>
          <img
            src={defaultAvatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="border border-white rounded-xl p-6 flex justify-between items-start gap-8 flex-wrap">
        {/* Left Section */}
        <div className="flex-1 min-w-[250px]">
          <button className="bg-blue-900 px-4 py-2 rounded mb-4">Request</button>

          <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>

          <div className="mb-4">
            <p className="font-semibold mb-1">Skills Offered</p>
            <ul className="list-disc list-inside">
              {user.skillsOffered.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-1">Skills Wanted</p>
            <ul className="list-disc list-inside">
              {user.skillsWanted.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-semibold">Rating and Feedback</p>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        </div>

        {/* Right Section: Profile Photo */}
        <div className="w-40 h-40 rounded-full border-2 border-white flex items-center justify-center text-center text-sm">
          Profile Photo
        </div>
      </div>
    </div>
  );
}
