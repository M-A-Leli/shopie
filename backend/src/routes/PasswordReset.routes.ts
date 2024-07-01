import { Router } from 'express';
import PasswordResetController from '../controllers/PasswordReset.controller';
import { authenticateUser } from '../middleware/Authorization';

const router = Router();

router.post('/', PasswordResetController.sendPasswordResetCode); // Send and resend password reset code on request
router.post('/verify', PasswordResetController.verifyPasswordResetCode); // Verify password reset code
router.post('/reset', PasswordResetController.resetPassword); // Reset Password

export default router;
