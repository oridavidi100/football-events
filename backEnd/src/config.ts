require('dotenv').config();
const secret = process.env.SECRET_KEY;
const MONGO_URL = process.env.MONGO_URL;
module.exports = { secret, MONGO_URL };
