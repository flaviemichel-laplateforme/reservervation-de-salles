import { query } from '../config/db.js';

const Reservation = {

    //Vérifier si il y a des conflits
    async checkConflict(date_resa, heure_debut, heure_fin, idToExclude = null) {

        let sql = 'SELECT id FROM reservations WHERE date_resa = ? AND (heure_debut < ? AND heure_fin > ?)';
        const params = [date_resa, heure_fin, heure_debut];

        if (idToExclude) {
            sql += 'AND  id != ?';
            params.push(idToExclude);
        }

        const rows = await query(sql, params);
        return rows.length > 0;

    },


    // Créer une reservation
    async create({ user_id, date_resa, heure_debut, heure_fin, objet }) {

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

    // Trouver les information des réservations avec nom et prenom utilisateur 
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

    // Trouver réservation par ID
    async findByUserId(id) {

        const sql = 'SELECT * FROM reservations WHERE user_id = ? ';
        const results = await query(sql, [id]);
        return results || null;

    },

    /**
     * 
     * @param {id } 
     * @param {date_resa, heure_debut, heure_fin, objet} param1 
     * @returns result.affectedRows
     */
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

    async deleteById(id, user_id) {

        const sql = `DELETE FROM reservations WHERE id = ? AND user_id = ?`;

        const result = await query(sql, [id, user_id]);
        return result.affectedRows;

    }
};

export default Reservation;

