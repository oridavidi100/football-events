import bcrypt from 'bcrypt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
interface Body {
  email: string;
  name: string;
}
const secret = config.secret;
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: Body | any = {};
    const { password, username } = req.params;
    const usersArr = await User.find({ username: username });
    console.log(secret);
    for (let user of usersArr) {
      let ans = await bcrypt.compare(password, user.password);
      if (ans === true) {
        body.email = user.email;
        body.fullName = user.fullName;
        const accessToken = jwt.sign(body, secret as string);
        return res.send({ body, accessToken });
      }
    }
    if (usersArr.length > 0) {
      throw { status: 400, message: 'password incorrect' };
    }
    throw { status: 400, message: 'username not exist' };
  } catch (error) {
    next(error);
  }
};
