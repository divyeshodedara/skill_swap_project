const UserCard = ({ name, offeredSkills, wantedSkills, rating }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl flex items-center gap-4 border border-gray-700 my-4">
      <div className="h-20 w-20 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
        Profile Photo
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="text-green-400 mt-2">
          Skills Offered ⇒{" "}
          <span className="flex flex-wrap gap-2 mt-1">
            {offeredSkills.map((skill, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </span>
        </div>
        <div className="text-blue-400 mt-1">
          Skill Wanted ⇒{" "}
          <span className="flex flex-wrap gap-2 mt-1">
            {wantedSkills.map((skill, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </span>
        </div>
        <p className="text-sm mt-1">Rating: {rating}/5</p>
      </div>
      <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white">
        Request
      </button>
    </div>
  );
};

export default UserCard;
