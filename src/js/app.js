import { state } from './state.js';
import { renderColumns } from './render.js';
import { loadState, saveState } from './storage.js';

export function initApp() {
    const rootEl = document.querySelector('.column-list');
    if (!rootEl) return;

    const stored = loadState();
    if (stored?.columns) state.columns = stored.columns;

    renderColumns(rootEl, state);

    function resetAddColumnForm(columnEl) {
        const form = columnEl.querySelector('[data-role="add-column-form"]');
        const input = columnEl.querySelector('[data-role="add-column-input"]');
        const openBtn = columnEl.querySelector('[data-action="add-column-open"]');

        if (form) form.classList.add('is-hidden');
        if (openBtn) openBtn.classList.remove('is-hidden');

        if (!input) return;

        input.classList.remove('add-block__fieldset--error');
        input.removeAttribute('aria-invalid');
        input.value = '';
        input.placeholder = 'Введите название колонки';
    }

    rootEl.addEventListener('click', (event) => {
        const openBtn = event.target.closest('[data-action="add-column-open"]');
        if (openBtn) {
            const columnEl = openBtn.closest('.column');
            const form = columnEl.querySelector('[data-role="add-column-form"]');

            openBtn.classList.add('is-hidden');
            form.classList.remove('is-hidden');

            const input = columnEl.querySelector('[data-role="add-column-input"]');
            input.focus();
        }

        const cancelBtn = event.target.closest('[data-action="add-column-cancel"]');
        if (cancelBtn) {
            const columnEl = cancelBtn.closest('.column');
            resetAddColumnForm(columnEl);
        }
    });

    rootEl.addEventListener('input', (event) => {
        const input = event.target.closest('[data-role="add-column-input"]');
        if (!input) return;

        input.classList.remove('add-block__fieldset--error');
        input.removeAttribute('aria-invalid');

        input.placeholder = 'Введите название колонки';
    });

    rootEl.addEventListener('submit', (event) => {
        const form = event.target.closest('[data-role="add-column-form"]');
        if (!form) return;

        event.preventDefault();

        const columnEl = form.closest('.column');
        const input = columnEl.querySelector('[data-role="add-column-input"]');

        const value = input.value.trim();

        if (!value) {
            input.classList.add('add-block__fieldset--error');
            input.setAttribute('aria-invalid', 'true');

            input.value = '';
            input.placeholder = 'Введите название колонки';

            input.focus();
            return;
        }

        input.classList.remove('add-block__fieldset--error');
        input.removeAttribute('aria-invalid');

        const id = crypto?.randomUUID?.() ?? `col-${Date.now()}`;
        state.columns.push({ id, title: value });
        saveState(state);

        renderColumns(rootEl, state);
    });
}