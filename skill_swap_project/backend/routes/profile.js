import express from 'express';
import { getProfile, updateProfile } from '../controllers/userProfile.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getProfile);
router.post('/', authenticate, updateProfile); // create/update

export default router;
