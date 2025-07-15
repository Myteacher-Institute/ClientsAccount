import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';

export const useToast = () => {
    const { show } = useContext(ToastContext);

    return {
        showError: (msg) => show('error', msg),
        showSuccess: (msg) => show('success', msg),
        showWarning: (msg) => show('warning', msg),
    };
};
