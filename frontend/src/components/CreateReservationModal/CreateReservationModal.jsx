import { useState } from 'react';

const CreateReservationModal = ({ onClose, onSave, defaultDate = '', defaultHeureDebut = '', defaultHeureFin = '' }) => {
    // Le formulaire est pré-rempli avec la date et les heures du créneau cliqué
    const [formData, setFormData] = useState({
        objet: '',
        date_resa: defaultDate,
        heure_debut: defaultHeureDebut,
        heure_fin: defaultHeureFin
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData); // On sauvegarde
            onClose(); // On ferme la fenêtre si succès
        } catch (error) {
            console.error("Erreur de création", error);
            // L'erreur est gérée par le toast du hook
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Nouvelle Réservation</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>Objet de la réunion</label>
                        <input
                            type="text" name="objet"
                            value={formData.objet} onChange={handleChange}
                            required placeholder="Ex: Point d'équipe"
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
                        <button type="submit" className="btn-save">Réserver la salle</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReservationModal;