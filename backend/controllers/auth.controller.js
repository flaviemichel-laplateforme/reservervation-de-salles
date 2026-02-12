// controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
// Génère un token JWT
const generateToken = (utilisateur) => {
    return jwt.sign(
        { id: utilisateur.id, email: utilisateur.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};
// POST /api/auth/register
export const register = async (req, res) => {
    try {
        const { email, password, prenom, nom } = req.body;
        if (!email || !password || !prenom || !nom) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Le mot de passe doit contenir 8 caractères minimum, 1 majuscule et 1 chiffre' });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email déjà utilisé' });
        }
        const user = await User.create({ email, password, prenom, nom });
        const token = generateToken(user);
        res.status(201).json({ message: 'Inscription réussie', user, token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user || !(await User.verifyPassword(password, user.password))) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }
        const token = generateToken(user);
        res.status(200).json({
            message: 'Connexion réussie',
            user: { id: user.id, email: user.email, prenom: user.prenom, nom: user.nom },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
// GET /api/auth/me
export const getProfile = async (req, res) => {
    res.json({ user: req.user });
};