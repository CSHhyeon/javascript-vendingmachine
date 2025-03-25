import { isValidPrice, randomCoin } from '../Utils.js';

export class PurchaseProductController {
  constructor(model, manageProductView, changeChargeView, purchaseProductView) {
    this.model = model;
    this.manageProductView = manageProductView;
    this.changeChargeView = new this.changeChargeView;
    this.purchaseProductView = purchaseProductView;
    this.init();
  }

  init() {
    this.purchaseProductView.bindChargeButton(this.handleChargeButton.bind(this));
    this.purchaseProductView.bindCoinReturnButton(this.handleCoinReturnButton.bind(this));
    this.purchaseProductView.bindProductTable(this.handleProductTable.bind(this));
  }

  // 투입하기 버튼 클릭 핸들러
  handleChargeButton(event) {
    event.preventDefault();
  }

  // 반환하기 버튼 클릭 핸들러
  handleCoinReturnButton(event) {
    event.preventDefault();
  }

  // 상품 구매하기 버튼 클릭 핸들러
  handleProductTable(event) {
    event.preventDefault();
  }
}  