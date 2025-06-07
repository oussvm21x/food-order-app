import { persistStore } from 'redux-persist';

const expirationMiddleware = (store) => (next) => (action) => {
    // Skip middleware for RESET_STATE action to prevent infinite loop
    if (action.type === 'RESET_STATE') {
        return next(action);
    }
    const currentTime = Date.now();
    const expirationTime = 24 * 60 * 60 * 1000; // 1 day, for example
    const lastPersistTime = localStorage.getItem('persistTimestamp');

    if (lastPersistTime && currentTime - lastPersistTime > expirationTime) {
        store.dispatch({ type: 'RESET_STATE' }); // A custom action to clear state
        localStorage.removeItem('persist:root'); // Clear the persisted state
        localStorage.setItem('persistTimestamp', currentTime);
    } else {
        localStorage.setItem('persistTimestamp', currentTime);
    }

    return next(action);
};

export default expirationMiddleware;