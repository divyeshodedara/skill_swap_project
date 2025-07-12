import React, { useState } from "react";

export default function Screen5() {
  const [offeredSkill, setOfferedSkill] = useState("");
  const [wantedSkill, setWantedSkill] = useState("");
  const [message, setMessage] = useState("");

  // Dummy options for now (replace with dynamic later)
  const yourSkills = ["Graphic Design", "Video Editing", "Photoshop"];
  const theirSkills = ["Python", "JavaScript", "Management"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      offeredSkill,
      wantedSkill,
      message,
    });
    alert("Swap request submitted (mock)!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="border border-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl mb-6">Screen 5</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Your Offered Skill */}
          <div>
            <label className="block mb-1">Choose one of your offered skills</label>
            <select
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              className="w-full bg-black border border-white px-3 py-2 rounded"
              required
            >
              <option value="">Select</option>
              {yourSkills.map((skill, idx) => (
                <option key={idx} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Their Wanted Skill */}
          <div>
            <label className="block mb-1">Choose one of their wanted skills</label>
            <select
              value={wantedSkill}
              onChange={(e) => setWantedSkill(e.target.value)}
              className="w-full bg-black border border-white px-3 py-2 rounded"
              required
            >
              <option value="">Select</option>
              {theirSkills.map((skill, idx) => (
                <option key={idx} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black border border-white px-3 py-2 rounded h-32"
              placeholder="Optional message..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
