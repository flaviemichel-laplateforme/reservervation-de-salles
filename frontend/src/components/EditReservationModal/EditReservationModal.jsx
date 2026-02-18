import { useState } from 'react';

const EditReservationModal = ({ reservation, onClose, onSave }) => {
    // On extrait directement la date au format YYYY-MM-DD (sans passer par toISOString qui décale en UTC)
    const formattedDate = reservation.date_resa.split('T')[0];

    // Le formulaire est pré-rempli avec les infos de la réunion cliquée
    const [formData, setFormData] = useState({
        objet: reservation.objet,
        date_resa: formattedDate,
        heure_debut: reservation.heure_debut,
        heure_fin: reservation.heure_fin
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attention ici : on envoie l'ID en plus des nouvelles données !
            await onSave(reservation.id, formData);
            onClose();
        } catch (error) {
            console.error("Erreur de modification", error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                    <h3>Modifier la réservation</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>Objet de la réunion</label>
                        <input
                            type="text" name="objet"
                            value={formData.objet} onChange={handleChange} required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date" name="date_resa"
                            value={formData.date_resa} onChange={handleChange} required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Heure de début</label>
                            <input
                                type="time" name="heure_debut"
                                value={formData.heure_debut} onChange={handleChange} required
                            />
                        </div>
                        <div className="form-group">
                            <label>Heure de fin</label>
                            <input
                                type="time" name="heure_fin"
                                value={formData.heure_fin} onChange={handleChange} required
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-save">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReservationModal;