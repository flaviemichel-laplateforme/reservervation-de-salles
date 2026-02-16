import { fetchAPI } from './api';

// 1. Lire le planning (GET)
export const getAllReservations = async () => {
    // fetchAPI ajoute automatiquement '/api' et le token Bearer
    return await fetchAPI('/reservations', {
        method: 'GET'
    });

}

// 2. Créer une réservation (POST)
export const createReservation = async (reservationData) => {
    return await fetchAPI(`reservations/${id}`, {
        method: 'POST',
        body: JSON.stringify(reservationData),
    });
}

// 3. Modifier une réservation (PUT)
export const updateReservation = async (id, reservationData) => {
    // fetchAPI ajoute automatiquement '/api' et le token Bearer
    return await fetchAPI(`/reservations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(reservationData),
    });

}

// 4. Supprimer une réservation (DELETE)
export const deleteReservation = async (id) => {
    return await fetchAPI(`/reservations/${id}`, {
        method: 'DELETE',
    });
}
