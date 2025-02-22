import express from 'express';
const botRouter = express.Router();
import getBotOptions from '../controllers/botController.js';

// Define the route to get bot options
botRouter.get('/options', getBotOptions);

export default botRouter;