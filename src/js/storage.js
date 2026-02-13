const STORAGE_KEY = 'kanban_state_v1';

export function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}