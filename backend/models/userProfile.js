import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
    unique: true,
  },
  name: String,
  location: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  profileVisibility: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Public'
  },
  profilePhoto: String, // URL or file path
}, { timestamps: true });

export default mongoose.model('UserProfile', userProfileSchema);
