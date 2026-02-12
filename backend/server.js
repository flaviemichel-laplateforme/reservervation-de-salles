// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testConnection } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import authRoutes from './routes/reservation.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion BDD
testConnection();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
// Logger (dev)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
        next();
    });
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Starter Kit API (ES Modules)', status: 'online' });
});

// //Route test 
// app.get('/api/health', (req, res) => {
//     res.json({ message: "API is running 🚀" });
// });

/*
 POST   /api/auth/register
 POST   /api/auth/login
 GET    n/api/auth/me (protected)
*/
app.use('/api/auth', authRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));

app.use('/api/reservations', reservationRoutes);


// Démarrage
app.listen(PORT, () => {
    console.log(`Serveur sur http://localhost:${PORT}`);
});

