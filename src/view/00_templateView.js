export class TemplateView {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  init() {
    const app = document.getElementById('app');
    
    // 중복 방지
    if (!app.hasChildNodes()) { 
      const appTemplate = createAppTemplate();
      app.appendChild(appTemplate);
    }

    document.dispatchEvent(new Event('templateLoaded'));
  }  
}

function createAppTemplate() {
  const container = document.createDocumentFragment();

  const header = createHeader();
  const main = document.createElement('main');
  main.appendChild(createProductSection());
  main.appendChild(createCoinChargeSection());
  main.appendChild(createPurchaseSection());

  container.appendChild(header);
  container.appendChild(main);

  return container;
}

// 상품 관리, 잔돈 충전, 상품 구매 탭 이동 버튼
function createHeader() {
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  nav.id = 'tab-button-nav';

  const tabs = [
    { id: 'product-add-menu', text: '상품 관리', section: 'tab-section-1' },
    { id: 'vending-machine-manage-menu', text: '잔돈 충전', section: 'tab-section-2' },
    { id: 'product-purchase-menu', text: '상품 구매', section: 'tab-section-3' },
  ];

  tabs.forEach(({ id, text, section }) => {
    const button = document.createElement('button');
    button.id = id;
    button.dataset.tabSection = section;
    button.textContent = text;
    nav.appendChild(button);
  });

  header.appendChild(nav);
  return header;
}

// 상품 관리(추가) 메뉴
function createProductSection() {
  const section = document.createElement('section');
  section.id = 'tab-section-1';

  const title = document.createElement('h3');
  title.textContent = '상품 추가하기';

  const form = document.createElement('form');
  const nameInput = createInput('product-name-input', 'text');
  const priceInput = createInput('product-price-input', 'number');
  const quantityInput = createInput('product-quantity-input', 'number');
  const addButton = createButton('product-add-button', '추가하기');

  form.append(nameInput, priceInput, quantityInput, addButton);

  const tableTitle = document.createElement('h3');
  tableTitle.textContent = '상품 현황';

  const table = createTable('product-table1', ['상품명', '가격', '수량']);

  section.append(title, form, tableTitle, table);
  return section;
}

// 잔돈 충전 (자판기 보유 동전) 메뉴
function createCoinChargeSection() {
  const section = document.createElement('section');
  section.id = 'tab-section-2';
  section.hidden = true;

  const title = document.createElement('h3');
  title.textContent = '자판기 동전 충전하기';

  const form = document.createElement('form');
  const chargeInput = createInput('vending-machine-charge-input', 'number');
  const chargeButton = createButton('vending-machine-charge-button', '충전하기');

  form.append(chargeInput, chargeButton);

  const balanceText = document.createElement('p');
  balanceText.innerHTML = '보유 금액: <span id="vending-machine-charge-amount"></span>';

  const coinTitle = document.createElement('h3');
  coinTitle.textContent = '동전 보유 현황';

  const coinTable = createTableWithValues(
    [
      { label: '500원', id: 'vending-machine-coin-500-quantity' },
      { label: '100원', id: 'vending-machine-coin-100-quantity' },
      { label: '50원', id: 'vending-machine-coin-50-quantity' },
      { label: '10원', id: 'vending-machine-coin-10-quantity' },
    ]
  );

  section.append(title, form, balanceText, coinTitle, coinTable);
  return section;
}

// 상품 구매 메뉴
function createPurchaseSection() {
  const section = document.createElement('section');
  section.id = 'tab-section-3';
  section.hidden = true;

  const title = document.createElement('h3');
  title.textContent = '금액 투입';

  const form = document.createElement('form');
  const chargeInput = createInput('charge-input', 'number');
  const chargeButton = createButton('charge-button', '투입하기');

  form.append(chargeInput, chargeButton);

  const amountText = document.createElement('p');
  amountText.innerHTML = '투입한 금액: <span id="charge-amount"></span>';

  const productTitle = document.createElement('h3');
  productTitle.textContent = '구매할 수 있는 상품 현황';

  const productTable = createTable('product-table2', ['상품명', '가격', '수량', '구매']);

  const coinTitle = document.createElement('h3');
  coinTitle.textContent = '잔돈';

  const returnForm = document.createElement('form');
  const returnButton = createButton('coin-return-button', '반환하기');

  returnForm.appendChild(returnButton);

  const coinTable = createTableWithValues(
    [
      { label: '500원', id: 'coin-500-quantity' },
      { label: '100원', id: 'coin-100-quantity' },
      { label: '50원', id: 'coin-50-quantity' },
      { label: '10원', id: 'coin-10-quantity' },
    ]
  );

  section.append(title, form, amountText, productTitle, productTable, coinTitle, returnForm, coinTable);
  return section;
}

// 유틸성 함수
function createInput(id, type) {
  const input = document.createElement('input');
  input.id = id;
  input.type = type;
  return input;
}

function createButton(id, text) {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = text;
  return button;
}

function createTable(id, headers) {
  const table = document.createElement('table');
  table.id = id;
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.scope = 'col';
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);
  return table;
}

function createTableWithValues(rows) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = '동전';
  th1.scope = 'col';
  const th2 = document.createElement('th');
  th2.textContent = '개수';
  th2.scope = 'col';

  headerRow.append(th1, th2);
  thead.appendChild(headerRow);

  rows.forEach(({ label, id }) => {
    const tr = document.createElement('tr');
    const tdLabel = document.createElement('td');
    tdLabel.textContent = label;
    tdLabel.scope = 'row';
    const tdValue = document.createElement('td');
    tdValue.id = id;

    tr.append(tdLabel, tdValue);
    tbody.appendChild(tr);
  });

  table.append(thead, tbody);
  return table;
}
