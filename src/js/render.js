export function createColumnEl(column) {
  const columnEl = document.createElement('section');
  columnEl.className = 'column';
  columnEl.dataset.columnId = column.id;

  const titleEl = document.createElement('h2');
  titleEl.className = 'column__title';
  titleEl.textContent = column.title;

  const listEl = document.createElement('ul');
  listEl.className = 'card-list';

  const cards = Array.isArray(column.cards) ? column.cards : [];
  cards.forEach((card) => listEl.append(createCardEl(card)));

  const addCardBtn = createAddCardEl();

  columnEl.append(titleEl, listEl, addCardBtn);
  return columnEl;
}

export function createCardEl(card) {
  const itemListEl = document.createElement('li');
  itemListEl.className = 'card-list__item';

  const cardEl = document.createElement('article');
  cardEl.className = 'card-task';
  cardEl.dataset.cardId = card.id;

  const textEl = document.createElement('span');
  textEl.className = 'card-task__text';
  textEl.textContent = card.title;

  cardEl.append(textEl);
  itemListEl.append(cardEl);
  return itemListEl;
}

export function createAddColumnEl() {
  const columnEl = document.createElement('section');
  columnEl.className = 'column';
  columnEl.dataset.columnId = 'col-add';

  // КНОПКА
  const addColBtn = document.createElement('button');
  addColBtn.className = 'btn-add btn-add--primary';
  addColBtn.type = 'button';
  addColBtn.setAttribute('aria-label', 'Кнопка добавления колонки');
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
  submitBtn.setAttribute('aria-label', 'Кнопка добавить колонку');
  submitBtn.textContent = 'Добавить колонку';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'add-block__close-btn';
  cancelBtn.type = 'button';
  cancelBtn.setAttribute('aria-label', 'Кнопка закрытия меню добавления колонки');
  cancelBtn.dataset.action = 'add-column-cancel';

  labelEl.append(inputEl, spanEl);
  blockEl.append(submitBtn, cancelBtn);
  formEl.append(labelEl, blockEl);
  columnEl.append(addColBtn, formEl);

  return columnEl;
}

export function createAddCardEl() {
  const wrapperEl = document.createElement('div');
  wrapperEl.className = 'add-card';

  // КНОПКА
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

  // ФОРМА (скрыта по умолчанию)
  const formEl = document.createElement('form');
  formEl.className = 'is-hidden add-block';
  formEl.dataset.role = 'add-card-form';
  formEl.method = 'post';

  const labelEl = document.createElement('label');

  const spanEl = document.createElement('span');
  spanEl.className = 'visually-hidden';
  spanEl.textContent = 'Название задачи';

  const inputEl = document.createElement('input');
  inputEl.className = 'add-block__fieldset';
  inputEl.type = 'text';
  inputEl.placeholder = 'Введите название задачи';
  inputEl.dataset.role = 'add-card-input';

  const blockEl = document.createElement('div');
  blockEl.className = 'add-block__inner';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn-add btn-add--secondary';
  submitBtn.type = 'submit';
  submitBtn.setAttribute('aria-label', 'Кнопка добавить карточку');
  submitBtn.textContent = 'Добавить карточку';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'add-block__close-btn';
  cancelBtn.type = 'button';
  cancelBtn.setAttribute('aria-label', 'Кнопка закрытия меню добавления карточки');
  cancelBtn.dataset.action = 'add-card-cancel';

  labelEl.append(inputEl, spanEl);
  blockEl.append(submitBtn, cancelBtn);
  formEl.append(labelEl, blockEl);
  wrapperEl.append(addCardBtn, formEl);

  return wrapperEl;
}

export function renderColumns(rootEl, state) {
  const heading = rootEl.querySelector('h1.visually-hidden');

  rootEl.innerHTML = '';

  if (heading) rootEl.append(heading);

  const columns = Array.isArray(state?.columns) ? state.columns : [];

  const fragment = document.createDocumentFragment();
  columns.forEach((col) => fragment.append(createColumnEl(col)));

  fragment.append(createAddColumnEl());

  rootEl.append(fragment);
}