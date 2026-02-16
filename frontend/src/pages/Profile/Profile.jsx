import { useAuth } from '../../hooks/useAuth.js';

function Profile() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Mon profil</h1>
            <p>Bienvenue {user?.prenom} {user?.nom}  !</p>
        </div>
    );
}
export default Profile;