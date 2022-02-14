import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Router from './routers/api';
const PORT = 5000;
const app = express();
import errorHandlerMiddleware from './midllewares/errorHandler';
import config from './config';
const { MONGO_URL } = config;
if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB `);
    })
    .catch(error => {
      console.log('error connecting to MongoDB:', error.message);
    });
}
app.use(cors()); //cors middleware
app.use(express.json()); //json middleware

app.use('/', Router);

app.use(errorHandlerMiddleware);
export const server = app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
