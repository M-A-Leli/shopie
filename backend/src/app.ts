import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middleware/ErrorHandler';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || '',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 36000000, // 10hrs
        },
    })
);

// Routes
app.use('/api/v1', routes);

// Error handler middleware
app.use(errorHandler);

export default app;
