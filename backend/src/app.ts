import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { errorHandler } from './middleware/ErrorHandler';

// Create Express app
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/v1', routes);

// Error handler middleware
app.use(errorHandler);

export default app;
