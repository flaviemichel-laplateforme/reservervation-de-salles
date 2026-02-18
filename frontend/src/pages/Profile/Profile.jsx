import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { useReservationManager } from '../../hooks/useReservationManager';

// 1. LES NOUVEAUX IMPORTS DES COMPOSANTS EXTERNES
import ReservationCard from '../../components/ReservationCard/ReservationCard';
import EditReservationModal from '../../components/EditReservationModal/EditReservationModal';

import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [editingResa, setEditingResa] = useState(null);

    const { user, rawReservations, loading } = useProfile();
    const { reservations, removeReservation, modifyReservation } = useReservationManager(rawReservations);

    if (loading) return <div className="profile-loading"><p>Chargement...</p></div>;
    if (!user) return <div className="profile-error">Impossible de charger les données.</div>;

    return (
        <div className="profile-page">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <span className="arrow">←</span> Retour
            </button>

            <div className="profile-container">
                <header className="profile-header">
                    <div className="avatar">
                        {user.prenom.charAt(0)}{user.nom.charAt(0)}
                    </div>
                    <div className="user-info">
                        <h2>{user.prenom} {user.nom.toUpperCase()}</h2>
                        <p className="user-email">✉️ {user.email}</p>
                    </div>
                </header>

                <section className="reservations-section">
                    <div className="section-title">
                        <h3>Mes Réservations à venir</h3>
                        <span className="badge">{reservations.length}</span>
                    </div>

                    {reservations.length === 0 ? (
                        <div className="empty-state">
                            <p>Vous n'avez aucune réservation de salle pour le moment.</p>
                        </div>
                    ) : (
                        <div className="reservations-grid">
                            {/* Utilisation du composant importé */}
                            {reservations.map((resa) => (
                                <ReservationCard
                                    key={resa.id}
                                    reservation={resa}
                                    onDelete={() => removeReservation(resa.id)}
                                    onEdit={() => setEditingResa(resa)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Utilisation de la modale importée */}
            {editingResa && (
                <EditReservationModal
                    reservation={editingResa}
                    onClose={() => setEditingResa(null)}
                    onSave={modifyReservation}
                />
            )}
        </div>
    );
}

export default Profile;