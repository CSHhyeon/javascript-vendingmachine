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

    // 이름 & 가격 중복 확인
    if (this.productModel.isDuplicatedProduct(name, price)) {
      if (confirm("이미 존재하는 제품입니다. 수량을 늘리시겠습니까?")) {
        this.addQuantity(name, quantity);
      }
    } else if (this.productModel.isDuplicatedName(name)) {
      if (confirm("이미 존재하는 제품입니다. 가격을 변경하고, 수량을 늘리시겠습니까?")) {
        this.changePrice(name, price, quantity);
      }
    } else {
      this.addNewProduct(name, price, quantity);
    }

    this.manageProductView.clearInput();
  }

  // 수량 증가
  addQuantity(name, quantity) {
    const changedQuantity = this.productModel.addQuantity(name, quantity);
    this.manageProductView.changeProductQuantity(name, changedQuantity);
    this.purchaseProductView.changeProductQuantity(name, changedQuantity);
  }

  // 기존 제품 정보 수정
  changePrice(name, price, quantity) {
    const changedQuantity = this.productModel.changeInfo(name, price, quantity);
    this.manageProductView.changeProductInfo(name, price, changedQuantity);
    this.purchaseProductView.changeProductInfo(name, price, changedQuantity);
  }

  // 새로운 제품 추가
  addNewProduct(name, price, quantity) {
    const product = this.productModel.addProduct(name, price, quantity);
    this.manageProductView.addNewProduct(product);
    this.purchaseProductView.addProduct(product);
  }
}