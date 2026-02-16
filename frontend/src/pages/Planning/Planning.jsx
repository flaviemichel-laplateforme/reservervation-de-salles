import { useAuth } from '../../hooks/useAuth.js';

function Planning() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Planning</h1>
            <p>Bienvenue {user?.prenom} {user?.nom} sur le planning!</p>
        </div>
    );
}
export default Planning;