// 상품 구매 View
export class PurchaseProductView {
  constructor() {
    // 금액 투입
    this.chargeInput = document.querySelector("#charge-input");
    this.chargeButton = document.querySelector("#charge-button");
    this.chargeAmount = document.querySelector("#charge-amount");

    // 상품 테이블
    this.productTable = document.querySelector("#product-table2");

    // 잔돈 반환
    this.coinReturnButton = document.querySelector("#coin-return-button");
    this.coinQuantities = new Map([
      [500, document.querySelector("#coin-500-quantity")],
      [100, document.querySelector("#coin-100-quantity")],
      [50, document.querySelector("#coin-50-quantity")],
      [10, document.querySelector("#coin-10-quantity")],
    ]);
  }

  /* 입력값 반환 */
  getChargeInput() {
    return this.chargeInput.value;
  }

  clearInput() {
    this.chargeInput.value = "";
  }
  
  /* 이벤트 핸들러 바인딩 */
  bindChargeButton(handler) {
    this.chargeButton.addEventListener("click", handler);
  }

  bindCoinReturnButton(handler) {
    this.coinReturnButton.addEventListener("click", handler);
  }

  bindProductTable(handler) {
    this.productTable.addEventListener("click", handler);
  }

  // 보유 금액 update
  updateAmount(amount) {
    this.chargeAmount.textContent = amount + "원";
  }

  /* 상품 추가 */
  createTableRow() {
    const newTr = document.createElement("tr");
    newTr.className = "product-purchase-item";
    return newTr;
  }

  createTableData(data, className, dataSetName) {
    const newTd = document.createElement("td");
    newTd.className = className;
    newTd.textContent = data;
    newTd.setAttribute(dataSetName, data);
    return newTd;
  }

  createButton() {
    const newTd = document.createElement("td");
    const button = document.createElement("button");
    const textNode = document.createTextNode("구매하기");

    button.className = "purchase-button";
    button.appendChild(textNode);

    newTd.appendChild(button);
    return newTd;
  }

  addProduct(product) {
    const newTr = this.createTableRow();
    const name = this.createTableData(product.name, "product-purchase-name", "data-product-name");
    const price = this.createTableData(product.price, "product-purchase-price", "data-product-price");
    const quantity = this.createTableData(product.quantity, "product-purchase-quantity", "data-product-quantity");
    const button = this.createButton();
  
    newTr.appendChild(name);
    newTr.appendChild(price);
    newTr.appendChild(quantity);
    newTr.appendChild(button);

    this.productTable.appendChild(newTr);
  }

  /* 구매하기 버튼 클릭 (최대한 dataset 활용) */
  getProductName(parent) {
    return parent.querySelector('.product-purchase-name').dataset.productName;
  } 

  getProductPrice(parent) {
    return parseInt(parent.querySelector('.product-purchase-price').dataset.productPrice);
  }

  changeProductQuantity(parent, quantity) {
    const quantityTd = parent.querySelector('.product-purchase-quantity');
    quantityTd.textContent = quantity;
    quantityTd.dataset.productQuantity = quantity;
  }

  /* 수량 0이면 disabled */
  initButton() {
    const products = document.querySelectorAll('.product-purchase-item');
    products.forEach(row => {
      const productQuantity = row.querySelector('.product-purchase-quantity').textContent.trim();
      if (parseInt(productQuantity) === 0) {
        const purchaseButton = row.querySelector('.purchase-button');
        purchaseButton.disabled = true;
      }
    });
  }

  /* 상품 수량 변경 */
  changeProductQuantity(name, quantity) {
    const row = this.productTable.querySelector(`td[data-product-name="${name}"]`).closest('tr');
    row.querySelector('.product-purchase-quantity').textContent = quantity;
  }

  /* 상품 가격, 수량 변경 */
  changeProductInfo(name, price, quantity) {
    const row = this.productTable.querySelector(`td[data-product-name="${name}"]`).closest('tr');;
    row.querySelector('.product-purchase-price').textContent = price;
    row.querySelector('.product-purchase-quantity').textContent = quantity;
  }

  /* 잔돈 반환 출력 */
  updateCoinQuantity(coinMap) {
    for (const [coin, element] of this.coinQuantities) {
      element.textContent = `${coinMap.get(coin)}개`;
    }
  }
}