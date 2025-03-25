import { isValidPrice, randomCoin } from '../Utils.js';

export class PurchaseProductController {
  constructor(chargeModel, productModel, manageProductView, changeChargeView, purchaseProductView) {
    this.chargeModel = chargeModel;
    this.productModel = productModel;
    this.manageProductView = manageProductView;
    this.changeChargeView = changeChargeView;
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
    const chargeMoney = Number(this.purchaseProductView.getChargeInput());

    // 투입 금액 확인
    if (!isValidPrice(chargeMoney)) {
      alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");
      return;
    }

    // html 적용
    this.purchaseProductView.updateAmount(this.chargeModel.addUserMoney(chargeMoney));
  }

  // 상품 구매하기 버튼 클릭 핸들러
  handleProductTable(event) {
    event.preventDefault();
  }

  // 반환하기 버튼 클릭 핸들러
  handleCoinReturnButton(event) {
    event.preventDefault();
    const userMoney = this.chargeModel.getUserMoney();
    const machineMoney = this.chargeModel.getMachineMoney();

    let calcMoney = 0;
    if (machineMoney < userMoney) {
      calcMoney = machineMoney;
      this.chargeModel.setMachineMoney(0);
      this.chargeModel.setUserMoney(0);
    } else {
      calcMoney = userMoney;
      this.chargeModel.setMachineMoney(machineMoney - userMoney);
      this.chargeModel.setUserMoney(0);
    }

    // 상품 구매 페이지
    const returnCoinMap = this.chargeModel.minimumCoin(calcMoney);
    this.purchaseProductView.updateCoinQuantity(returnCoinMap);
    this.purchaseProductView.updateAmount(this.chargeModel.getUserMoney());

    // 잔돈 충전 페이지
    const coinMap = this.chargeModel.getCurrentCoin();
    this.changeChargeView.updateCoinQuantity(coinMap);
    this.changeChargeView.updateAmount(this.chargeModel.getMachineMoney());
  }
}  