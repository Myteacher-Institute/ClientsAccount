import { eventBus } from './eventBus';

export const toast = {
    info: (msg) => eventBus.emit('toast', { type: 'info', message: msg }),
    error: (msg) => eventBus.emit('toast', { type: 'error', message: msg }),
    success: (msg) => eventBus.emit('toast', { type: 'success', message: msg }),
    warning: (msg) => eventBus.emit('toast', { type: 'warning', message: msg }),
};
