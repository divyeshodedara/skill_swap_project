import UserProfile from '../models/userProfile.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const { name, location, skillsOffered, skillsWanted, availability, profileVisibility, profilePhoto } = req.body;

  console.log("Received profile data:", {
    name,
    location,
    skillsOffered,
    skillsWanted,
    availability,
    profileVisibility,
    skillsOfferedType: typeof skillsOffered,
    skillsWantedType: typeof skillsWanted,
    skillsOfferedLength: skillsOffered ? skillsOffered.length : 'undefined',
    skillsWantedLength: skillsWanted ? skillsWanted.length : 'undefined'
  });

  try {
    let profile = await UserProfile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = await UserProfile.create({
        userId: req.user.id,
        name,
        location,
        skillsOffered,
        skillsWanted,
        availability,
        profileVisibility,
        profilePhoto,
      });
    } else {
      profile.name = name;
      profile.location = location;
      profile.skillsOffered = skillsOffered;
      profile.skillsWanted = skillsWanted;
      profile.availability = availability;
      profile.profileVisibility = profileVisibility;
      profile.profilePhoto = profilePhoto;

      await profile.save();
    }

    console.log("Saved profile:", {
      skillsOffered: profile.skillsOffered,
      skillsWanted: profile.skillsWanted
    });

    res.json(profile);
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};
