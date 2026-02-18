import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import './Home.css';

function Home() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    // Fonction pour le bouton de la carte
    const handleReserveClick = () => {
        navigate('/planning');
    };

    return (
        <div className="home-page">
            {/* --- SECTION HERO (Image de fond globale) --- */}
            <section className="hero-section">

                {/* Conteneur pour limiter la largeur et utiliser Flexbox */}
                <div className="hero-container">

                    {/* --- PARTIE GAUCHE : Textes et Liens --- */}
                    <div className="hero-text-content">
                        <h1>
                            Bienvenue {user ? <span className="text-neon">{user.prenom}</span> : ''} <br />
                            chez TechSpace
                        </h1>
                        <p className="hero-subtitle">Votre espace de travail moderne et connecté.</p>

                        <div className="hero-actions">
                            {isAuthenticated ? (
                                <Link to="/profile" className="btn-primary">Accéder à mon profil</Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn-primary">Commencer</Link>
                                    <Link to="/login" className="btn-secondary">Se connecter</Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- PARTIE DROITE : La Carte Superposée --- */}
                    <div className="hero-card">
                        <div className="card-image-container">

                            <img
                                src="/assets/img/salle.png"
                                alt="Salle 12 places"
                                className="card-img"
                            />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title">Salle 12 places</h2>
                            <p className="card-desc">Idéale pour vos réunions d'équipe avec écran interactif.</p>
                            <button className="btn-reserve" onClick={handleReserveClick}>
                                Réserver
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Home;