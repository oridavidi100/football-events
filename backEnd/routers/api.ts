import express from 'express';

import userRouter from './register';
import loginRouter from './login';
import postRouter from './post';

const router = express.Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/post', postRouter);

export default router;
