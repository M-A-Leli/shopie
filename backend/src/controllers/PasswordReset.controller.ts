import { Request, Response, NextFunction } from 'express';
import PasswordResetService from '../services/PasswordReset.service';


class PasswordResetController {

  private passwordResetService: PasswordResetService;

  constructor() {
    this.passwordResetService = new PasswordResetService();
  }

  sendPasswordResetCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.passwordResetService.sendPasswordResetCode(req.body.email);
      res.status(200).json({ message: 'Password reset code sent' });
    } catch (error) {
      next(error);
    }
  }

  verifyPasswordResetCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.passwordResetService.verifyPasswordResetCode(req.body.user_id, req.body.reset_code);
      res.status(200).json({ message: 'Reset code verified' });
    } catch (error) {
      next(error);
    }
  }

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.passwordResetService.resetPassword(req.body.user_id, req.body.newPassword);
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      next(error);
    }
  }
}

export default new PasswordResetController();
