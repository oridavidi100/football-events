import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const PORT = 5000;
export const app = express();

// app.use(cors()); //cors middleware
app.use(express.json()); //json middleware

export const server = app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);

export default app;
