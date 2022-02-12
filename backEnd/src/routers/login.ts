import express from 'express';
const { login } = require('../controllers/login');
const router = express.Router();

router.post('/', login);

export default router;
