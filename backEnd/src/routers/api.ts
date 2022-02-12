import express from 'express';
import loginRouter from './login';
import tokenExtractor from '../midllewares/accessToken';
import registerRouter from './register';
const router = express.Router();
router.use('/register', registerRouter);
router.use(tokenExtractor);
router.use('/login', loginRouter);

export default router;
