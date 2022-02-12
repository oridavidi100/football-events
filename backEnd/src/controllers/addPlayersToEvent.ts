import { Event } from '../models/Event';
import { NextFunction, Request, Response } from 'express';
exports.addplayersToEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.body;
  const user = req.body.user;
  const event: any = await Event.findById(eventId);
  const players = event.Players;
  if (players.includes(user.fullName)) {
    var playerIndex = players.indexOf('car');
    players.splice(playerIndex, 1);
    event.Players = players;
    await event.save();
    console.log(event);
    res.status(200).send(event + 'seccess');
  } else {
    players.push(user.fullName);
    event.Players = players;
    await event.save();
    console.log(event);
    res.status(200).send(event + 'seccess');
  }
};
