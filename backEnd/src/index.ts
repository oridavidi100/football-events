import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const PORT = 5000;
export const app = express();
const { MONGO_URL } = require('./config');
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

export const server = app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);

export default app;
