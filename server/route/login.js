import express from 'express';
import { getUser } from '../controllers/login.js';

const router = express.Router();

router.post('/', getUser);

export default router;