import CreateReservation from '../models/reservation.model.js';


export const createReservation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date_resa, heure_debut, heure_fin, objet } = req.body;

        if (!date_resa || !heure_debut || !heure_fin || !objet) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
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

        // On appelle directement la fonction importée
        const hasConflict = await CreateReservation.checkConflit(date_resa, heure_debut, heure_fin);

        if (hasConflict) {
            return res.status(409).json({ message: "Créneau indisponible (conflit)." });
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