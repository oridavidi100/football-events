import { Message } from '../models/Messages';
import { NextFunction, Request, Response } from 'express';
exports.getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { room } = req.params;
    console.log('rooooom', room);
    const messages = await Message.find({ room: room });
    console.log('messages', messages);
    res.send(messages);
  } catch (error) {
    next(error);
  }
};
