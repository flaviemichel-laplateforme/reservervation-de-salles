import { fetchAPI } from './api';


// 5. Récupérer MON profil avec MES réservations (GET)
export const getProfile = async () => {
    return await fetchAPI('/auth/me', {
        method: 'GET',
    });
}
