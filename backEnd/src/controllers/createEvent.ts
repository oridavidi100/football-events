import { Event } from '../models/Event';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { nanoid } from 'nanoid';
exports.createEvent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { location, date, imgSrc, adress } = req.body;
    if (!location || !date) {
      throw { status: 400, message: 'missing fields' };
    }
    const user = req.body.user;
    const players = [];
    players.push(user.id);
    const event = new Event({
      _id: nanoid(),
      location,
      Players: players,
      date,
      creator: user.fullName,
      img: imgSrc,
      adress,
    });
    event.save();
    res.send(event);
  } catch (error) {
    next(error);
  }
};

exports.getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find().populate({
      path: 'Players',
      model: 'User',
      select: { fullName: 1, email: 1, position: 1 },
    });
    res.send(events);
  } catch (error) {
    next(error);
  }
};
