// 상품 관리 View
export class ManageProductView {
  constructor() {
    // 상품 추가하기
    this.productNameInput = document.querySelector("#product-name-input");
    this.productPriceInput = document.querySelector("#product-price-input");
    this.productQuantityInput = document.querySelector("#product-quantity-input");
    this.productAddButton = document.querySelector("#product-add-button");
    
    // 상품 현황
    this.productTable = document.querySelector("#product-table1");
  }

  /* 입력값 반환 */
  getProductData() {
    return {
      name: this.productNameInput.value,
      price: Number(this.productPriceInput.value),
      quantity: Number(this.productQuantityInput.value)
    }
  }

  /* 이벤트 핸들러 바인딩 */
  bindProductAddButton(handler) {
    this.productAddButton.addEventListener("click", handler);
  }

  /* 상품 추가 */
  createTableRow() {
    const newTr = document.createElement("tr");
    newTr.className = "product-manage-item";

    return newTr;
  }

  createTableData(data, className) {
    const newTd = document.createElement("td");
    newTd.className = className;

    const textNode = document.createTextNode(data);
    newTd.appendChild(textNode);
    return newTd;
  }

  addNewProduct(product) {
    const newTr = this.createTableRow();
    const name = this.createTableData(product.name, "product-manage-name");
    const price = this.createTableData(product.price, "product-manage-price");
    const quantity = this.createTableData(product.quantity, "product-manage-quantity");
    
    newTr.appendChild(name);
    newTr.appendChild(price);
    newTr.appendChild(quantity);

    this.productTable.appendChild(newTr);
  }

  /* 상품 수량 변경 */
  changeProductQuantity(name, quantity) {
    const products = document.querySelectorAll('.product-manage-item');

    products.forEach(row => {
      const productName = row.querySelector('.product-manage-name');
      if (productName.textContent.trim() === name) {
        const productQuantity = row.querySelector('.product-manage-quantity');
        productQuantity.replaceChildren(document.createTextNode(quantity));
      }
});

  }

  clearInput() {
    this.productNameInput.value = "";
    this.productPriceInput.value = "";
    this.productQuantityInput.value = "";
  }
}