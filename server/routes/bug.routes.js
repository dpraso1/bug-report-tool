import express from 'express'
import { createBug, getAllBugs, changeCompletedStatus, getBugsByUserId } from '../controllers/bug.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

//registration
router.post('/', authMiddleware, createBug);

//login
router.get('/', authMiddleware, getAllBugs);

router.put('/:id/status', authMiddleware, changeCompletedStatus);

router.get('/:userId', authMiddleware, getBugsByUserId);

export default router;
