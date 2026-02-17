// pages/Register/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

function Register() {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register({ prenom, nom, email, password });
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom</label>
                    <input type="text" value={prenom}
                        onChange={(e) => setPrenom(e.target.value)} required />
                </div>
                <div>
                    <label>Nom</label>
                    <input type="text" value={nom}
                        onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Inscription...' : "S'inscrire"}
                </button>
            </form>
            <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
        </div>
    );
}
export default Register;
