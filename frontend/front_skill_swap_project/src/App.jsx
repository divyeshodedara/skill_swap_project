import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import Pagination from "./components/Pagination";

const users = [
  {
    name: "Marc Demo",
    offeredSkills: ["JavaScript", "Python"],
    wantedSkills: ["Photoshop", "Graphic Designer"],
    rating: 3.9,
  },
  {
    name: "Michell",
    offeredSkills: ["JavaScript", "Python"],
    wantedSkills: ["Photoshop", "Graphic Designer"],
    rating: 2.5,
  },
  {
    name: "Joe Wills",
    offeredSkills: ["JavaScript", "Python"],
    wantedSkills: ["Photoshop", "Graphic Designer"],
    rating: 4.0,
  },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        {users.map((user, index) => (
          <UserCard key={index} {...user} />
        ))}
        <Pagination
          totalPages={7}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;
