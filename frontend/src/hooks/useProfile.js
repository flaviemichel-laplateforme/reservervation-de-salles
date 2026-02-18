import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api.js';
import toast from 'react-hot-toast';

export const useProfile = () => {
    // 1. Les états (State)
    const [user, setUser] = useState(null);
    const [rawReservations, setRawReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. La logique de récupération (mémorisée pour la performance)
    const loadData = useCallback(async () => {
        try {
            // Appel à ton service API qui pointe vers /auth/me
            const data = await authService.getProfile();

            // On stocke les infos de l'utilisateur
            // /me renvoie data.infos, /login renvoie data.user
            setUser(data.infos || data.user || data);

            // On stocke les réservations brutes telles qu'elles viennent du serveur
            setRawReservations(data.reservations || []);

        } catch (err) {
            toast.error("Impossible de charger vos informations.");
            console.error("Erreur useProfile:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Déclenchement au chargement du hook
    useEffect(() => {
        loadData();
    }, [loadData]);

    // 4. On retourne uniquement ce dont la page a besoin
    return { user, rawReservations, loading };
};