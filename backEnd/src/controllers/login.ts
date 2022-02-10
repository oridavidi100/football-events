const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = require('../config');
interface Body {
  email: string;
  name: string;
}
exports.login = async (req, res, next) => {
  try {
    const body: Body | any = {};
    const { password, username } = req.params;
    const usersArr = await User.find({ username: username });
    for (let user of usersArr) {
      let ans = await bcrypt.compare(password, user.password);
      if (ans === true) {
        body.email = user.email;
        body.name = user.name;
        const accessToken = jwt.sign(username, SECRET);
        return res.send({ body, accessToken });
      }
    }
    if (usersArr.length > 0) {
      throw { status: 400, message: 'password incorrect' };
    }
    throw { status: 400, message: 'username not exist' };
  } catch (error) {
    console.log(error);
    next(error);
  }
};
