import './ReservationDetailModal.css';

const ReservationDetailModal = ({ reservation, isMine, isPast, onClose, onEdit, onDelete }) => {
    const dateStr = reservation.date_resa?.split('T')[0] || reservation.date_resa;
    const formattedDate = new Date(dateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                    <h3>Détail de la réservation</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <div className="detail-body">
                    <div className="detail-row">
                        <span className="detail-label">Objet</span>
                        <span className="detail-value">{reservation.objet}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Organisateur</span>
                        <span className="detail-value">{reservation.prenom} {reservation.nom}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{formattedDate}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Horaire</span>
                        <span className="detail-value">{reservation.heure_debut} — {reservation.heure_fin}</span>
                    </div>

                    {!isMine && (
                        <p className="detail-info">
                            Cette réservation appartient à {reservation.prenom} {reservation.nom}.
                        </p>
                    )}
                </div>

                <div className="modal-actions">
                    {isMine && !isPast && (
                        <>
                            <button className="btn-edit" onClick={() => { onClose(); onEdit(reservation); }}>
                                ✏️ Modifier
                            </button>
                            <button className="btn-delete" onClick={() => { onClose(); onDelete(reservation.id); }}>
                                🗑️ Supprimer
                            </button>
                        </>
                    )}
                    <button className="btn-cancel" onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationDetailModal;
