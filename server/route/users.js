import express from 'express';

import { getUsers, getUser, createUser, deleteUser, authUser, registeredSports, getIDs, getBanner } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.post('/auth', authUser);

router.post('/', createUser);

router.get('/registered/:id', registeredSports);

router.get('/players/:sports', getIDs);

router.get('/players/banner/:id', getBanner);

export default router;