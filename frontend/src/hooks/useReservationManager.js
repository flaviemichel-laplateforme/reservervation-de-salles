import { useState, useEffect } from 'react';
// On importe directement les fonctions depuis ton service !
import { deleteReservation, updateReservation } from '../services/reservationService';
import toast from 'react-hot-toast';

export const useReservationManager = (initialReservations = []) => {
    const [reservations, setReservations] = useState(initialReservations);

    // Synchronisation avec les données venant du profil
    useEffect(() => {
        setReservations(initialReservations);
    }, [initialReservations]);

    // L'action de suppression isolée
    const removeReservation = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir annuler ce créneau ?")) return;

        const previousReservations = [...reservations];

        // Optimistic UI : Mise à jour instantanée de l'écran
        setReservations(prev => prev.filter(resa => resa.id !== id));

        try {
            // Utilisation de la fonction importée de ton service
            await deleteReservation(id);
            toast.success('Réservation annulée avec succès !');
        } catch (err) {
            setReservations(previousReservations);
            toast.error(err.message || "Échec de l'annulation.");
        }
    };

    // La logique de modification
    const modifyReservation = async (id, updatedData) => {
        const previousReservations = [...reservations];

        // Optimistic UI : Mise à jour instantanée
        setReservations(prev =>
            prev.map(resa => resa.id === id ? { ...resa, ...updatedData } : resa)
        );

        try {
            await updateReservation(id, updatedData);
            toast.success('Réservation modifiée avec succès !');
        } catch (err) {
            setReservations(previousReservations);
            toast.error(err.message || "Échec de la modification.");
            throw err;
        }
    };

    return {
        reservations,
        removeReservation,
        modifyReservation
    };
};