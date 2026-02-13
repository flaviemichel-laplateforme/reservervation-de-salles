import express from 'express';
import { createReservation, getAllReservations, deleteResa } from '../controllers/reservation.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllReservations);

router.post('/', authMiddleware, createReservation);

router.delete('/:id', authMiddleware, deleteResa)

export default router;