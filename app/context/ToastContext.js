import { eventBus } from '@/utils/eventBus';
import ClientsToast from '@/components/ClientsToast';
import { useRef, useState, useEffect, createContext } from 'react';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const timeoutRef = useRef(null);
    const [toast, setToast] = useState(null);

    const show = (type, message) => {
        setToast({ type, message });
        if (timeoutRef.current) { clearTimeout(timeoutRef.current); }
        timeoutRef.current = setTimeout(() => setToast(null), 3000);
    };

    // 🔥 Listen to toast events globally
    useEffect(() => {
        const handler = ({ type, message }) => show(type, message);
        eventBus.on('toast', handler);
        return () => eventBus.off('toast', handler);
    }, []);

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <ClientsToast toast={toast} />
        </ToastContext.Provider>
    );
};
