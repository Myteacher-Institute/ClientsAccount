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
                val === '' ||
                val === null ||
                val === undefined ||
                (typeof val === 'object' && !val?.uri);

            if (isEmpty) { newErrors[key] = 'Required'; }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showWarning('Please fill all required fields');
            return false;
        }

        return true;
    };

    const toFormData = () => {
        const formData = new FormData();
        for (const key in values) {
            const val = values[key];
            if (val?.uri && val?.name && val?.type) {
                formData.append(key, {
                    uri: val.uri,
                    type: val.type,
                    name: val.name,
                });
            } else {
                formData.append(key, val);
            }
        }
        return formData;
    };

    const reset = () => {
        setValues(initialState);
        setErrors({});
    };

    const setValue = (key, val) => setValues((prev) => ({ ...prev, [key]: val }));

    return {
        bind,
        reset,
        errors,
        values,
        bindFile,
        validate,
        setValue,
        setValues,
        toFormData,
        setField: setValue,
    };
};
