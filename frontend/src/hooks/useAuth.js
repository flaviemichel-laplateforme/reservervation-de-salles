import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

// 5. 🔥 LE HOOK MAGIQUE (Custom Hook)
// C'est ça qui rend ton code "Pro".
// Au lieu d'importer useContext(AuthContext) partout, tu importes juste useAuth()
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};