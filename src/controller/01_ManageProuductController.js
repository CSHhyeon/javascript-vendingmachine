import { isValidPrice, isValidQuantity } from '../Utils.js';

export class ManageProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }
  
  init() {
    this.view.bindProductAddButton(this.handleProductAddButton.bind(this));
  }

  handleProductAddButton(event) {
    event.preventDefault();
    const { name, price, quantity } = this.view.getProductData();

    // 이름 중복 확인
    if (this.model.isDuplicated(name)) {
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

    const product = this.model.addProduct(name, price, quantity);
    this.view.addNewProduct(product);
  }
}