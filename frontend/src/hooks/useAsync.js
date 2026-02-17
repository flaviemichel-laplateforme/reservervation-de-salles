import { useState, useCallback } from 'react';

// Hooks pour la gestion de : loading, error, data

const useAsync = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (asyncFunction, params = null) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const result = await asyncFunction(params);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || "Une erreur est survenue");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    return { loading, error, data, execute };

}

export default useAsync;

