import { useState } from 'react';
import { useToast } from '@/hooks';

export const useForm = (initialState = {}, requiredFields = Object.keys(initialState)) => {
    const { showWarning } = useToast();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(initialState);

    const handleChange = (key, val) => {
        setValues((prev) => ({ ...prev, [key]: val }));
        setErrors((prev) => ({ ...prev, [key]: null }));
    };

    const bind = (key) => ({
        value: values[key],
        onChangeText: (val) => handleChange(key, val),
    });

    const bindFile = (key) => ({
        value: values[key],
        onChange: (file) => handleChange(key, file),
    });

    const validate = () => {
        const newErrors = {};

        for (const key of requiredFields) {
            const val = values[key];
            const isEmpty =
                val === null ||
                val === undefined ||
                val === '' ||
                (typeof val === 'object' && !val?.uri);

            if (isEmpty) {
                newErrors[key] = 'Required';
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showWarning('Please fill all required fields');
            return false;
        }

        return true;
    };

    const reset = () => {
        setValues(initialState);
        setErrors({});
    };

    const setValue = (key, val) => setValues((prev) => ({ ...prev, [key]: val }));

    return {
        bind,
        reset,
        values,
        errors,
        bindFile,
        validate,
        setValue,
        setValues,
        setField: setValue,
    };
};
