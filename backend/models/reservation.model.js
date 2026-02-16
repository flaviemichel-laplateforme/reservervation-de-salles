import { query } from '../config/db.js';

const CreateReservation = {

    async checkConflict(date_resa, heure_debut, heure_fin) {

        const sql = 'SELECT id FROM reservations WHERE date_resa = ? AND (heure_debut < ? AND heure_fin > ?)';
        const rows = await query(sql, [date_resa, heure_fin, heure_debut]);
        return rows.length > 0;

    },

    // Créer une reservation
    async createResa({ user_id, date_resa, heure_debut, heure_fin, objet }) {

        const sql = `INSERT INTO reservations (user_id, date_resa, heure_debut, heure_fin, objet)
VALUES (?, ?, ?, ?,?)`;
        const result = await query(sql, [
            user_id,
            date_resa,
            heure_debut,
            heure_fin,
            objet
        ]);
        return result.insertId;// Retourne l'ID créé
    },

    async findAll() {
        const sql = `
        SELECT
            r.id,
            r.date_resa,
            r.heure_debut,
            r.heure_fin,
            r.objet,
            u.nom,
            u.prenom
        FROM reservations r
        JOIN utilisateurs u ON r.user_id = u.id
        ORDER BY r.date_resa ASC, r.heure_debut ASC
            `;
        const rows = await query(sql);
        return rows;
    },


};

const DeleteReservation = {
    async deleteById(id, user_id) {
        const sql = `DELETE FROM reservations WHERE id = ? AND user_id = ?`;

        try {
            const result = await query(sql, [id, user_id]);
            return result.affectedRows;
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            throw error;
        }
    }
};


const UpdateReservation = {


    async findById(id) {

        const sql = 'SELECT * FROM reservations WHERE id = ?';
        const results = await query(sql, [id]);
        return results[0] || null;
    },

    async checkConflictForUpdate(date_resa, heure_debut, heure_fin, idToExclude) {

        const sql = 'SELECT id FROM reservations WHERE date_resa = ? AND (heure_debut < ? AND heure_fin > ?) AND id != ? --';
        const rows = await query(sql, [date_resa, heure_fin, heure_debut, idToExclude]);
        return rows.length > 0;

    },

    // Créer une reservation
    async update(id, { date_resa, heure_debut, heure_fin, objet }) {

        const sql = `UPDATE reservations SET date_resa = ? , heure_debut = ? , heure_fin = ?, objet = ? WHERE id = ?`;
        const result = await query(sql, [

            date_resa,
            heure_debut,
            heure_fin,
            objet,
            id
        ]);
        return result.affectedRows;// Retourne le nombre de lignes modifiées.
    },
};


export { CreateReservation, DeleteReservation, UpdateReservation };

