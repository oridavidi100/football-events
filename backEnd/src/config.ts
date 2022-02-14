require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const secret = process.env.SECRET_KEY;
export default { secret, MONGO_URL };
