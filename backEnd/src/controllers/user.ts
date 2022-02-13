import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName } = req.params;
    const user = await User.findOne({ fullName: fullName });
    res.send(user);
  } catch (error) {
    next(error);
  }
};
