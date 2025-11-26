import express from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import createError from 'http-errors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import env from './config/env.js';
import logger from './config/logger.js';
import { connectDatabase } from './config/database.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();

const corsOptions = {
  origin: env.CLIENT_ORIGIN,
  credentials: true
};

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(
  session({
    secret: env.SESSION_SECRET,
    name: env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.SESSION_SECURE,
      sameSite: env.SESSION_SECURE ? 'none' : 'lax',
      maxAge: env.SESSION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000,
      domain: env.SESSION_DOMAIN || undefined
    },
    store: mongoStore.create({
      mongoUrl: env.MONGODB_URI,
      collectionName: 'sessions',
      ttl: env.SESSION_MAX_AGE_DAYS * 24 * 60 * 60
    })
  })
);

app.use((req, res, next) => {
  if (!req.session) {
    logger.warn('Session middleware not initialized');
  }
  next();
});

app.use('/api', apiLimiter, routes);

app.get('/health', async (_req, res, next) => {
  try {
    await connectDatabase();
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

app.use((_req, _res, next) => {
  next(createError(404, 'Resource not found'));
});

app.use(errorHandler);

export default app;
