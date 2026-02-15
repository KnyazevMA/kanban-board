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

        input.value = '';
        clearInputError(input, 'Введите название колонки');
    }

    function resetAddCardForm(columnEl) {
        const form = columnEl.querySelector('[data-role="add-card-form"]');
        const input = columnEl.querySelector('[data-role="add-card-input"]');
        const openBtn = columnEl.querySelector('[data-action="add-card-open"]');

        if (form) form.classList.add('is-hidden');
        if (openBtn) openBtn.classList.remove('is-hidden');

        if (!input) return;

        input.value = '';
        clearInputError(input, 'Введите название карточки');
    }

    function setInputError(input, placeholder) {
        input.classList.add('add-block__fieldset--error');
        input.setAttribute('aria-invalid', 'true');
        input.value = '';
        input.placeholder = placeholder;
        input.focus();
    }

    function clearInputError(input, placeholder) {
        input.classList.remove('add-block__fieldset--error');
        input.removeAttribute('aria-invalid');
        if (placeholder) input.placeholder = placeholder;
    }

    rootEl.addEventListener('click', (event) => {
        //* ---------COLUMN------------
        const openColBtn = event.target.closest('[data-action="add-column-open"]');
        if (openColBtn) {
            const columnEl = openColBtn.closest('.column');
            const form = columnEl.querySelector('[data-role="add-column-form"]');
            if (!form) return;

            openColBtn.classList.add('is-hidden');
            form.classList.remove('is-hidden');

            const input = columnEl.querySelector('[data-role="add-column-input"]');
            input.focus();
            return;
        }

        const cancelColBtn = event.target.closest('[data-action="add-column-cancel"]');
        if (cancelColBtn) {
            const columnEl = cancelColBtn.closest('.column');
            resetAddColumnForm(columnEl);
            return;
        }

        //* ---------CARD------------
        const openCardBtn = event.target.closest('[data-action="add-card-open"]');
        if (openCardBtn) {
            const columnEl = openCardBtn.closest('.column');
            const form = columnEl.querySelector('[data-role="add-card-form"]');
            const input = columnEl.querySelector('[data-role="add-card-input"]');
            if (!input) return;

            openCardBtn.classList.add('is-hidden');
            form.classList.remove('is-hidden');
            input.focus();
            return;
        }

        const cancelCard = event.target.closest('[data-action="add-card-cancel"]');
        if (cancelCard) {
            resetAddCardForm(cancelCard.closest('.column'));
            return;
        }
    });

    rootEl.addEventListener('input', (event) => {
        const input = event.target.closest('[data-role="add-column-input"], [data-role="add-card-input"]');
        if (!input) return;

        const placeholder = input.matches('[data-role="add-column-input"]')
            ? 'Введите название колонки'
            : 'Введите название карточки';

        clearInputError(input, placeholder);
    });

    rootEl.addEventListener('submit', (event) => {
        const colForm = event.target.closest('[data-role="add-column-form"]');
        if (colForm) {
            event.preventDefault();

            const columnEl = colForm.closest('.column');
            const input = columnEl.querySelector('[data-role="add-column-input"]');

            const value = input.value.trim();

            if (!value) {
                setInputError(input, 'Введите название колонки');
                return;
            }

            clearInputError(input, 'Введите название колонки');

            const id = crypto?.randomUUID?.() ?? `col-${Date.now()}`;
            state.columns.push({ id, title: value, cards: [] });
            saveState(state);

            renderColumns(rootEl, state);
            return;
        }

        const cardForm = event.target.closest('[data-role="add-card-form"]');
        if (cardForm) {
            event.preventDefault();
            const columnEl = cardForm.closest('.column');
            const columnId = columnEl.dataset.columnId;

            const input = columnEl.querySelector('[data-role="add-card-input"]');
            const value = input.value.trim();

            if (!value) {
                setInputError(input, 'Введите название карточки');
                return;
            }

            clearInputError(input, 'Введите название карточки');

            const column = state.columns.find((c) => c.id === columnId);
            if (!column) return;

            if (!Array.isArray(column.cards)) column.cards = [];

            const id = crypto?.randomUUID?.() ?? `card-${Date.now()}`;
            column.cards.push({ id, title: value });

            saveState(state);
            renderColumns(rootEl, state);

            resetAddCardForm(columnEl); return;
        }
    });
}