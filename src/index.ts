import express, { Request, Response } from 'express';
import { connectDB } from './constants/config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.status(301).json({ haha: 'Hello From Express and Typescirpt' });
});

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});
