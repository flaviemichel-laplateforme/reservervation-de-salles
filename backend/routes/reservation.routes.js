import express from 'express';
import { createReservation } from '../controllers/reservation.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createReservation);

export default router;