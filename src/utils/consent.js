import { useSyncExternalStore } from 'react';

// Consenso ai contenuti di terze parti (oggi solo Google Maps).
// Valori: 'accepted' | 'rejected' | null (il visitatore non ha ancora scelto).
const STORAGE_KEY = 'consent';
const EVENT = 'consentchange';
// Copia in memoria: se lo storage non è disponibile (es. navigazione privata)
// la scelta vale comunque per tutta la visita.
let memory = null;

function read() {
    try {
        return localStorage.getItem(STORAGE_KEY) ?? memory;
    } catch {
        return memory;
    }
}

export function setConsent(value) {
    memory = value;
    try {
        if (value) localStorage.setItem(STORAGE_KEY, value);
        else localStorage.removeItem(STORAGE_KEY);
    } catch {
        // Storage non disponibile: resta la copia in memoria.
    }
    window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback) {
    window.addEventListener(EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

export function useConsent() {
    return useSyncExternalStore(subscribe, read, () => null);
}
