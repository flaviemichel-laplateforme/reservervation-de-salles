import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    //Met à jour une valeur spécifique quand on tape
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    //remet le formulaire à zero
    const resetForm = () => {
        setValues(initialValues);
    };

    //Permet de remplir le formulaire d'un coup 
    const setForm = (newValues) => {
        setValues(newValues);
    };

    return { values, handleChange, resetForm, setForm };
};

export default useForm;