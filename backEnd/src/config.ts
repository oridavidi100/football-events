require('dotenv').config();
const secret = process.env.SECRET_KEY;
// console.log(secret);
const MONGO_URL = process.env.MONGO_URL;
// console.log(MONGO_URL);
export default { secret, MONGO_URL };
