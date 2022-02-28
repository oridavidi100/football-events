require('dotenv').config();
// const MONGO_URL = process.env.MONGO_URL;
const secret = process.env.SECRET_KEY;
const MONGO_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URL;
export default { secret, MONGO_URL };
