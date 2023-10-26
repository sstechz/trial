import express from 'express';
import { getSports } from '../controllers/sports.js';
import { getDetails } from '../controllers/sports.js';

const router = express.Router();

router.get('/', getSports);
router.get('/:sports', getDetails);

export default router;