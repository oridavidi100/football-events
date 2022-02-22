import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Router from './routers/api';
const PORT = 5000;
const app = express();
import errorHandlerMiddleware from './midllewares/errorHandler';
import config from './config';
const { MONGO_URL } = config;
import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.on('connection', socket => {
  console.log('connect');
});

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

export const server = httpServer.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
