import { isValidPrice, isValidQuantity } from '../Utils.js';

export class ManageProductController {
  constructor(productModel, manageProductView, purchaseProductView) {
    this.productModel = productModel;
    this.manageProductView = manageProductView;
    this.purchaseProductView = purchaseProductView;
    this.init();
    this.bindEvents();
  }

  init() {
    this.productModel.loadFromLocalStorage();
    const productMap = this.productModel.getProducts();

    for (const product of productMap.values()) {
      this.manageProductView.addNewProduct(product);
      this.purchaseProductView.addProduct(product);
    }
  }
  
  bindEvents() {
    this.manageProductView.bindProductAddButton(this.handleProductAddButton.bind(this));
  }

  handleProductAddButton(event) {
    event.preventDefault();
    const { name, price, quantity } = this.manageProductView.getProductData();

    // 이름 중복 확인
    if (this.productModel.isDuplicated(name)) {
      alert("이미 존재하는 제품입니다. 다른 이름으로 입력하세요.");
      return;
    }

    // 가격 확인
    if (!isValidPrice(price)) {
      alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");
      return;
    }

    // 수량 확인
    if (!isValidQuantity(quantity)) {
      alert("0 이상의 정수를 입력하세요.");
      return;
    }

    this.manageProductView.clearInput();

    const product = this.productModel.addProduct(name, price, quantity);
    this.manageProductView.addNewProduct(product);
    this.purchaseProductView.addProduct(product);
  }
}