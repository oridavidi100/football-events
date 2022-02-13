const { createEvent } = require('../controllers/createEvent');
import express from 'express';
const { addplayersToEvent } = require('../controllers/addPlayersToEvent');
const router = express.Router();

router.use('/create', createEvent);
router.use('/addPlayer', addplayersToEvent);
export default router;
