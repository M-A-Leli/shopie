import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';
import prisma from '../config/Prisma.config';

class PasswordResetService {
  async hashPassword(password: string): Promise<{ hash: string, salt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  async sendPasswordResetCode(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const resetCode = randomBytes(3).toString('hex').toUpperCase();
    const expirationTime = addMinutes(new Date(), 15);

    await prisma.passwordResetToken.create({
      data: {
        user_id: user.id,
        reset_code: resetCode,
        expires_at: expirationTime
      },
    });

    // Send email logic should go here
    console.log(`Reset code: ${resetCode}`); // Placeholder for email sending
  }

  async verifyPasswordResetCode(user_id: string, reset_code: string): Promise<void> {
    const passwordReset = await prisma.passwordResetToken.findFirst({
      where: {
        user_id,
        reset_code,
        is_valid: true,
        expires_at: { gt: new Date() },
      },
    });

    if (!passwordReset) {
      throw createError(400, 'Invalid or expired reset code');
    }
  }

  async resetPassword(id: string, newPassword: string): Promise<void> {
    const { hash, salt } = await this.hashPassword(newPassword);

    await prisma.user.update({
      where: { id },
      data: { 
        password: hash,
        salt: salt
       },
    });

    await prisma.passwordResetToken.updateMany({
      where: { user_id: id, is_valid: true },
      data: { is_valid: false },
    });
  }
}

export default PasswordResetService;
