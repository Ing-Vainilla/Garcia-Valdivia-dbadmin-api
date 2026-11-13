import { Router } from 'express';
import { getUser, getUserById } from '../controllers/user.controller.js';

const router = Router();

router.get('/user', getUser);
router.get('/getUserById/:id', getUserById);

export default router;
