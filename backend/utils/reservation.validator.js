
export const validateReservationRules = (date_resa, heure_debut, heure_fin, objet) => {
    if (!date_resa || !heure_debut || !heure_fin || !objet) return "Tous les champs sont requis";

    const day = new Date(date_resa).getDay();
    if (day === 0 || day === 6) return "Réservations fermées le week-end.";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(date_resa) < today) return "Impossible de réserver dans le passé.";

    const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const startMin = toMin(heure_debut);
    const endMin = toMin(heure_fin);


    // Plage horaire autorisée : 8h00 - 19h00
    if (startMin < toMin('08:00:00') || endMin > toMin('19:00:00'))
        return "Les réservations doivent êtres faites entre 08h00 et 19H00";

    if (endMin <= startMin) return "L'heure de fin doit être après l'heure de début.";
    if ((endMin - startMin) < 60) return "La réservation doit être d'1H minimum.";
    if ((endMin - startMin) % 60 !== 0) return "La durée doit être en blocs d'1H (1h, 2h, 3h...).";

    return null;

};
