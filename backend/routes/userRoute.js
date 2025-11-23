import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes publiques (pas besoin de token)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Routes protégées (nécessitent un token JWT)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;