import express, { Express } from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5005';

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

export default app;
