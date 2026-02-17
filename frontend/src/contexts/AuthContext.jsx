import { createContext, useState, useEffect, useContext } from 'react';
// Vérifie bien que le chemin vers ton service est correct selon ton architecture
import { authService } from '../services/api.js';

// 1. Création du contexte
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // On charge par défaut (vrai), pour ne pas afficher la page de Login 
    // tant qu'on ne sait pas si l'utilisateur est déjà connecté.
    const [loading, setLoading] = useState(true);

    // 2. Vérification au chargement de l'application (F5)
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // On vérifie si le token est valide en récupérant le profil
                const data = await authService.getProfile();
                // ATTENTION : Adapte 'data.infos' ou 'data.user' selon ce que renvoie ton backend (route /me)
                // Dans notre backend précédent, c'était data.infos
                setUser(data.infos || data.user);
            } catch (error) {
                // Si le token est invalide ou expiré
                console.error("Session expirée :", error);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                // Quoi qu'il arrive, le chargement est fini
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // 3. Actions (Login, Register, Logout)

    const login = async (email, password) => {
        // On laisse l'erreur remonter pour que la Page Login puisse l'afficher (try/catch dans la page)
        const data = await authService.login(email, password);

        localStorage.setItem('token', data.token);
        // Backend: assure-toi que /login renvoie bien l'objet user, sinon fais un getProfile() juste après
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // Optionnel : recharger la page pour vider tous les états
        // window.location.href = '/login'; 
    };

    // 4. Le Rendu
    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user, // Transforme l'objet user en booléen (true/false)
            login,
            register,
            logout
        }}>
            {/* On n'affiche l'application que quand on a fini de vérifier le token */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

