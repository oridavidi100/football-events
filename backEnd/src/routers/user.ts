const { getUser } = require('../controllers/user');
import express from 'express';
const router = express.Router();
router.get('/:fullName', getUser);
router.get('/', getUser);
export default router;
