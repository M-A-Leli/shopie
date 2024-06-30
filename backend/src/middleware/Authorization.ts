import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Middleware to authenticate user
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    res.locals.user = decoded; // Attach the decoded user info to res.locals
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to authorize admin
const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  authenticateUser(req, res, () => {
    if (res.locals.user && typeof res.locals.user !== 'string' && res.locals.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
  });
};

export { authenticateUser, authorizeAdmin };
