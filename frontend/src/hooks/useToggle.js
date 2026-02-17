import { useState, useCallback } from 'react';

const useToggle = (initialState = false) => {

    const [isOpen, setIsOpen] = useState(initialState);

    // Change l'état (Vrai -> Faux, Faux -> Vrai)
    // useCallback évite que la fonction soit recréée à chaque rendu (perf)
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return { isOpen, toggle, open, close };

};

export default useToggle;