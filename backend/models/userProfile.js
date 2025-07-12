// models/UserProfile.js
import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    type: String,
    default: ''
  },

  profilePhoto: {
    type: String, // URL to avatar
    default: ''
  },

  skillsOffered: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0
  },

  skillsWanted: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0
  },

  availability: {
    type: String,
    enum: ['weekends', 'weekdays', 'evenings', 'mornings', 'flexible'],
    default: 'flexible'
  },

  profileVisibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }

}, { timestamps: true });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;
