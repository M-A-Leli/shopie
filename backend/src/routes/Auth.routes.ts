import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';

const router = Router();

router.post('/login', AuthController.login); // Login
router.post('/logout', AuthController.logout); // Logout

export default router;
