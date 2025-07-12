import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/defaultAvatar.png"; // ✅ Ensure this exists
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [availability, setAvailability] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [profilePhoto, setProfilePhoto] = useState(null); // base64 or URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillOfferedInput, setSkillOfferedInput] = useState("");
  const [skillWantedInput, setSkillWantedInput] = useState("");

  const token = localStorage.getItem("token");

  // Load profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        console.log("Fetched profile data:", data);
        console.log("Skills Offered from server:", data.skillsOffered);
        console.log("Skills Wanted from server:", data.skillsWanted);
        
        setName(data.name || "");
        setLocation(data.location || "");
        setSkillsOffered(data.skillsOffered || []);
        setSkillsWanted(data.skillsWanted || []);
        setAvailability(data.availability || "");
        setProfileVisibility(data.profileVisibility || "Public");
        setProfilePhoto(data.profilePhoto || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    if (token) fetchProfile();
    else navigate("/login");
  }, [token, navigate]);

  const handleSkillAdd = (list, setList, inputValue, setInputValue) => (e) => {
    if ((e.key === "Enter" || e.type === "blur") && inputValue.trim() !== "") {
      const newList = [...list, inputValue.trim()];
      setList(newList);
      setInputValue("");
      console.log("Updated list:", newList);
    }
  };

  const handleSkillRemove = (skill, list, setList) => {
    setList(list.filter((s) => s !== skill));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress the image
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set maximum dimensions
          const maxWidth = 300;
          const maxHeight = 300;
          
          let { width, height } = img;
          
          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
          
          setProfilePhoto(compressedDataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Before saving, make sure to add any pending input
  const handleSave = async () => {
    // Add pending skill inputs if not empty
    let finalSkillsOffered = skillsOffered;
    let finalSkillsWanted = skillsWanted;
    if (skillOfferedInput.trim() !== "") {
      finalSkillsOffered = [...skillsOffered, skillOfferedInput.trim()];
      setSkillsOffered(finalSkillsOffered);
      setSkillOfferedInput("");
    }
    if (skillWantedInput.trim() !== "") {
      finalSkillsWanted = [...skillsWanted, skillWantedInput.trim()];
      setSkillsWanted(finalSkillsWanted);
      setSkillWantedInput("");
    }
    setLoading(true);
    setError("");
    try {
      const profileData = {
        name,
        location,
        skillsOffered: finalSkillsOffered,
        skillsWanted: finalSkillsWanted,
        availability,
        profileVisibility,
        profilePhoto,
      };
      
      console.log("Sending profile data:", profileData);
      console.log("Skills Offered (type):", typeof finalSkillsOffered, "length:", finalSkillsOffered.length);
      console.log("Skills Wanted (type):", typeof finalSkillsWanted, "length:", finalSkillsWanted.length);
      
      const res = await fetch("http://localhost:8000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      const data = await res.json();
      console.log("Response data:", data);
      
      if (!res.ok) {
        const errorMessage = (data.message ? data.message : "Failed to save profile") + (data.error ? " (" + data.error + ")" : "");
        throw new Error(errorMessage);
      }
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto border border-white rounded-xl p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <button
              className="text-green-400 font-semibold mr-4"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
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

        {/* Error */}
        {error && <p className="text-red-400 mb-4">{error}</p>}

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
              value={skillOfferedInput}
              onChange={e => setSkillOfferedInput(e.target.value)}
              onKeyDown={handleSkillAdd(skillsOffered, setSkillsOffered, skillOfferedInput, setSkillOfferedInput)}
              onBlur={handleSkillAdd(skillsOffered, setSkillsOffered, skillOfferedInput, setSkillOfferedInput)}
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
              value={skillWantedInput}
              onChange={e => setSkillWantedInput(e.target.value)}
              onKeyDown={handleSkillAdd(skillsWanted, setSkillsWanted, skillWantedInput, setSkillWantedInput)}
              onBlur={handleSkillAdd(skillsWanted, setSkillsWanted, skillWantedInput, setSkillWantedInput)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
