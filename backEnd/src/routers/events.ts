const { createEvent } = require('../controllers/createEvent');
import express from 'express';
const { addplayersToEvent } = require('../controllers/addPlayersToEvent');
const { ball } = require('../controllers/createEvent');
const router = express.Router();
router.post('/giveBall', ball);
router.post('/create', createEvent);
router.post('/addPlayer', addplayersToEvent);
export default router;
