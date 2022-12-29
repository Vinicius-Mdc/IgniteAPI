import 'reflect-metadata';
import './database/dataSource.js';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import userRouter from './routes/usuario.js';
const app = express();
app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use('/usuario', userRouter);
app.use((err, req, res, next) => {
    if (err.sql) {
        res.status(500).json({ error: 'Algo deu errado.' });
    }
    else {
        res.status(err.code || 500).json({ message: err.message });
    }
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port: ${process.env.PORT || 3000}`);
});
