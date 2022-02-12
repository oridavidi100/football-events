import { Event } from '../models/Event';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { nanoid } from 'nanoid';
exports.createEvent = (req: Request, res: Response, next: NextFunction) => {
  const { location, date } = req.body;
  if (!location || !date) {
    throw { status: 400, message: 'missing fields' };
  }
  const user = req.body.user;
  const players = [];
  players.push(user.fullName);
  const event = new Event({
    _id: nanoid(),
    location,
    Players: players,
    date,
    creator: user.fullName,
  });
  event.save();
  res.send(event);
};
