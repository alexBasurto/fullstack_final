import { Router } from 'express';

import authController from '../controllers/authController.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/session', (req, res) => authController.session(req, res));
router.post('/logout', authController.logout);

export default router;