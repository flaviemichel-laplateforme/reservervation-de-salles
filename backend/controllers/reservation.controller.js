import { CreateReservation, DeleteReservation, UpdateReservation } from '../models/reservation.model.js';

export const createReservation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date_resa, heure_debut, heure_fin, objet } = req.body;

        if (!date_resa || !heure_debut || !heure_fin || !objet) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // On appelle directement la fonction importée
        const hasConflict = await CreateReservation.checkConflict(date_resa, heure_debut, heure_fin);


        if (hasConflict) {
            return res.status(409).json({ message: "Créneau indisponible (conflit)." });
        }
        //Pas de week-end
        const dateObj = new Date(date_resa);
        const day = dateObj.getDay();
        if (day === 0 || day === 6) {
            return res.status(400).json({ message: "Réservations fermées le week-end." });
        }

        //Pas dans le passé 
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(date_resa) < today) {
            return res.status(400).json({ message: "Impossible de réservé dans le passé." });
        }


        // D. Durée min 1h

        const getMinutes = (timeStr) => {
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
        };

        const startMin = getMinutes(heure_debut);
        const endMin = getMinutes(heure_fin);

        if (endMin <= startMin) {
            return res.status(400).json({ message: "L'heure de fin doit être après l'heure du début." });
        }

        if ((endMin - startMin) < 60) {
            return res.status(400).json({ message: "La réservation doit être d'1H minimum" });

        }

        const newId = await CreateReservation.createResa({
            user_id: userId,
            date_resa,
            heure_debut,
            heure_fin,
            objet
        });

        res.status(201).json({
            id: newId,
            message: "Réservation réalisée avec succès"
        });



    } catch (error) {
        console.error("Erreur Controller:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const getAllReservations = async (req, res) => {
    try {
        // 1. Appel au Modèle
        const reservations = await CreateReservation.findAll();

        // 2. Réponse (200 OK)
        res.status(200).json(reservations);

    } catch (error) {
        console.error("Erreur Controller GetAll:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du planning." });
    }
};

export const deleteResa = async (req, res) => {
    try {
        const userId = req.user.id;
        const reservationId = req.params.id;

        if (!reservationId) {
            return res.status(400).json({ message: "ID de réservation manquant." });
        }
        // Appel au modèle
        const affectedRows = await DeleteReservation.deleteById(reservationId, userId);

        if (affectedRows === 0) {
            // Si 0 ligne supprimée, c'est soit que la résa n'existe pas, 
            // soit qu'elle n'appartient pas à cet utilisateur.
            return res.status(404).json({ message: "Réservation introuvable ou non autorisée." });
        }
        // 200 OK (ou 204 No Content)
        res.status(200).json({ message: "Réservation annulée avec succès." });
    } catch (error) {
        console.error("Erreur Controller Delete:", error);
        res.status(500).json({ message: "Erreur serveur lors de l'annulation." });
    }
};

