import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { defaultErrorHandler } from './middlewares/error.middlewares';
import { connectDB } from './constants/config';
import route from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use(express.json());

app.use(route);
app.use(defaultErrorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
