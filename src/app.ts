import express, { Express } from 'express';
import cors from 'cors';
import router from './routes';

const app: Express = express();

const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5005';

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use('/api', router);

export default app;
