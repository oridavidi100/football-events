import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { NextFunction, Request, Response } from 'express';

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, fullName, nameOfPet } = req.body;
    let { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const usersArr = await User.find({ email: email });
    if (usersArr.length > 0) {
      throw { status: 400, message: 'user already exist' };
    }
    const user = await User.create({
      email,
      password,
      fullName,
      nameOfPet,
    });
    res.status(201).send('Register Success' + user);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
