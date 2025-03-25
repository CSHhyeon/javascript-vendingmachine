// 상품 구매 View
export class PurchaseProductView {
  constructor() {
    // 금액 투입
    this.chargeInput = document.querySelector("#charge-input");
    this.chargeButton = document.querySelector("#charge-button");
    this.chargeAmount = document.querySelector("#charge-amount");

    // TODO) 구매하기 버튼
    this.productTable = document.querySelector("#product-table2");

    // 잔돈 반환
    this.coinReturnButton = document.querySelector("#coin-return-button");
    this.coin500Quantity = document.querySelector("#coin-500-quantity");
    this.coin100Quantity = document.querySelector("#coin-100-quantity");
    this.coin50Quantity = document.querySelector("#coin-50-quantity");
    this.coin10Quantity = document.querySelector("#coin-10-quantity");
  }

  /* 입력값 반환 */
  getChargeInput() {
    return this.chargeInput.value;
  }
  
  /* 이벤트 핸들러 바인딩 */
  // TODO

  /* 상품 추가 */
  createTableRow() {
    const newTr = document.createElement("tr");
    newTr.className = "product-purchase-item";

    return newTr;
  }

  createTableData(data, className, dataSetName) {
    const newTd = document.createElement("td");
    newTd.className = className;
    newTd.setAttribute(dataSetName, data);

    const textNode = document.createTextNode(data);
    newTd.appendChild(textNode);
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

}