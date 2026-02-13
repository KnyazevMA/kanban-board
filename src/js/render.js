export function createColumnEl(column) {
    const columnEl = document.createElement('section');
    columnEl.className = 'column';
    columnEl.dataset.columnId = column.id;

    const titleEl = document.createElement('h2');
    titleEl.className = 'column__title';
    titleEl.textContent = column.title;

    const addCardBtn = document.createElement('button');
    addCardBtn.className = 'btn-add btn-add--primary';
    addCardBtn.type = 'button';
    addCardBtn.setAttribute('aria-label', 'Кнопка добавления карточки в колонку');
    addCardBtn.dataset.action = 'add-card-open';
    addCardBtn.innerHTML = `
      <svg class="btn-add__icon" width="15" height="15" aria-hidden="true">
        <use xlink:href="/images/sprite.svg#add-icon"></use>
      </svg>
      <span class="btn-add__text">Добавить еще одну карточку</span>
    `;

    columnEl.append(titleEl, addCardBtn);
    return columnEl;
}

export function createAddColumnEl() {
    const columnEl = document.createElement('section');
    columnEl.className = 'column';
    columnEl.dataset.columnId = 'col-add';

    // КНОПКА
    const addColBtn = document.createElement('button');
    addColBtn.className = 'btn-add btn-add--primary';
    addColBtn.type = 'button';
    addColBtn.setAttribute('aria-label', 'Кнопка добавления карточки в колонку');
    addColBtn.dataset.action = 'add-column-open';
    addColBtn.innerHTML = `
        <svg class="btn-add__icon" width="15" height="15" aria-hidden="true">
          <use xlink:href="/images/sprite.svg#add-icon"></use>
        </svg>
        <span class="btn-add__text">Добавить еще одну колонку</span>
    `;

    // ФОРМА (скрыта по умолчанию)
    const formEl = document.createElement('form');
    formEl.className = 'is-hidden add-block';
    formEl.dataset.role = 'add-column-form';
    formEl.method = 'post';

    const labelEl = document.createElement('label');

    const spanEl = document.createElement('span');
    spanEl.className = 'visually-hidden';
    spanEl.textContent = 'Название колонки';

    const inputEl = document.createElement('input');
    inputEl.className = 'add-block__fieldset';
    inputEl.type = 'text';
    inputEl.placeholder = 'Введите название колонки';
    inputEl.dataset.role = 'add-column-input';

    const blockEl = document.createElement('div');
    blockEl.className = 'add-block__inner';

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn-add btn-add--secondary';
    submitBtn.type = 'submit';
    addColBtn.setAttribute('aria-label', 'Кнопка добавить колонку');
    submitBtn.textContent = 'Добавить колонку';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'add-block__close-btn';
    cancelBtn.type = 'button';
    addColBtn.setAttribute('aria-label', 'Кнопка закрытия меню добавления колонки');
    cancelBtn.dataset.action = 'add-column-cancel';

    labelEl.append(inputEl, spanEl);
    blockEl.append(submitBtn, cancelBtn);
    formEl.append(labelEl, blockEl);
    columnEl.append(addColBtn, formEl);

    return columnEl;
}

export function renderColumns(rootEl, state) {
    const heading = rootEl.querySelector('.visually-hidden');

    rootEl.innerHTML = '';

    if (heading) rootEl.append(heading);

    const columns = Array.isArray(state?.columns) ? state.columns : [];

    const fragment = document.createDocumentFragment();
    columns.forEach((col) => fragment.append(createColumnEl(col)));

    fragment.append(createAddColumnEl());

    rootEl.append(fragment);
}