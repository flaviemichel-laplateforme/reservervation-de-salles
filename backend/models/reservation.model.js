// models/user.model.js
import { query } from '../config/db.js';

const CreateReservation = {
    // Trouver par email
    async checkConflit(date_resa, heure_debut, heure_fin) {
        const sql = '-SELECT id FROM reservations WHERE date_resa = ? AND (heure_debut < ? AND heure_fin > ?';
        const row = await db.execute(sql, [date_resa, heure_debut, heure_fin]);
        return rows.length > 0;
    },

    // Créer une reservation
    async createResa({ user_id, date_resa, heure_debut, heure_fin, objet }) {

        const sql = `INSERT INTO reservations (user_id, date_resa, heure_debut, heure_fin, objet)
VALUES (?, ?, ?, ?,?)`;
        const [result] = await db.execute(sql, [
            user_id,
            date_resa,
            heure_debut,
            heure_fin,
            objet
        ]);
        return result.insertId;// Retourne l'ID créé
    },

};
export default CreateReservation;