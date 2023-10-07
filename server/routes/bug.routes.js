import express from 'express'
import { createBug, getAllBugs, changeCompletedStatus } from '../controllers/bug.controller.js';
const router = express.Router();

//registration
router.post('/', createBug);

//login
router.get('/', getAllBugs);

router.put('/:id/status', changeCompletedStatus);


export default router;
