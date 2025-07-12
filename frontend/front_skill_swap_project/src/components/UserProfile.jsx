import React, { useState } from "react";
import defaultAvatar from "../assets/defaultAvatar.png"; // ✅ Make sure this exists

export default function UserProfile() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [availability, setAvailability] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSkillAdd = (list, setList) => (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setList([...list, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleSkillRemove = (skill, list, setList) => {
    setList(list.filter((s) => s !== skill));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto border border-white rounded-xl p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <button className="text-green-400 font-semibold mr-4">Save</button>
            <button className="text-red-400 font-semibold">Discard</button>
          </div>
          <div className="space-x-4 flex items-center">
            <button className="underline">Swap Request</button>
            <button className="underline">Home</button>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <img
                src={profilePhoto || defaultAvatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              className="w-full bg-black border border-white px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mt-4 mb-1">Location</label>
            <input
              className="w-full bg-black border border-white px-3 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label className="block mt-4 mb-1">Skills Offered</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skillsOffered.map((skill, idx) => (
                <span
                  key={idx}
                  className="border px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() =>
                      handleSkillRemove(skill, skillsOffered, setSkillsOffered)
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="w-full bg-black border border-white px-3 py-2"
              placeholder="Press Enter to add skill"
              onKeyDown={handleSkillAdd(skillsOffered, setSkillsOffered)}
            />

            <label className="block mt-4 mb-1">Availability</label>
            <input
              className="w-full bg-black border border-white px-3 py-2"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />

            <label className="block mt-4 mb-1">Profile Visibility</label>
            <select
              className="w-full bg-black border border-white px-3 py-2"
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Right Panel */}
          <div>
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-gray-800 text-white text-lg font-semibold">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span>Profile</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mb-2"
              />
              {profilePhoto && (
                <button
                  className="text-red-400"
                  onClick={() => setProfilePhoto(null)}
                >
                  Remove
                </button>
              )}
            </div>

            {/* Skills Wanted */}
            <label className="block mb-1">Skills Wanted</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skillsWanted.map((skill, idx) => (
                <span
                  key={idx}
                  className="border px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() =>
                      handleSkillRemove(skill, skillsWanted, setSkillsWanted)
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="w-full bg-black border border-white px-3 py-2"
              placeholder="Press Enter to add skill"
              onKeyDown={handleSkillAdd(skillsWanted, setSkillsWanted)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
