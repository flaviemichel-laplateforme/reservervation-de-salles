// components/Header.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import './Header.css';

function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <header>

            <nav>
                <NavLink to="/">Accueil</NavLink>
                {isAuthenticated && <NavLink to="/planning">Planning</NavLink>}
                {isAuthenticated && <NavLink to="/profile">Mon profil</NavLink>}
            </nav>
            <div>
                {isAuthenticated ? (
                    <>
                        <span>{user?.prenom}</span>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register">S'inscrire</Link>
                    </>
                )}
            </div>
        </header>
    );
}
export default Header;