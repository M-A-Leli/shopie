import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import AuthService from '../services/Auth.service';

interface DecodedToken {
    userId: string;
    role: string;
}

class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    generateAccessToken = async (user: any) => {
        const payload = {
            userId: user.id,
            role: user.admin ? 'admin' : 'user' // Determine role based on presence of Admin
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return accessToken;
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { email, password } = req.body;
            const user = await this.authService.authenticate(email, password);
    
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const accessToken = await this.generateAccessToken(user);

            // Store token in a cookie
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60, // Cookie expires in 1 hour (adjust as needed)
                httpOnly: true, // Cookie accessible only via HTTP(S)
                secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
                sameSite: 'strict' // Ensures CSRF protection
            });
    
            // Determine the redirect URL based on user's role
            let redirectUrl = '/';
            if (user.admin) {
                redirectUrl = '/admin/dashboard';
            } else {
                redirectUrl = '/user/dashboard';
            }
    
            // res.redirect(redirectUrl);
            res.status(200).json({ token: accessToken, redirectUrl, user_id: user.id });
        } catch (error) {
            next(error);
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Clear the accessToken cookie
            res.clearCookie('accessToken');
            res.redirect('/'); // Redirect to the homepage after logout
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
