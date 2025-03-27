import { isValidPrice } from '../Utils.js';

export class PurchaseProductController {
  constructor(chargeModel, productModel, manageProductView, changeChargeView, purchaseProductView) {
    this.chargeModel = chargeModel;
    this.productModel = productModel;
    this.manageProductView = manageProductView;
    this.changeChargeView = changeChargeView;
    this.purchaseProductView = purchaseProductView;
    this.init();
    this.bindEvents();
  }

  init() {
    this.chargeModel.loadUserMoneyFromLS();
    this.purchaseProductView.updateAmount(this.chargeModel.getUserMoney());
    this.purchaseProductView.initButton();
  }

  bindEvents() {
    this.purchaseProductView.bindChargeButton(this.handleChargeButton.bind(this));
    this.purchaseProductView.bindCoinReturnButton(this.handleCoinReturnButton.bind(this));
    this.purchaseProductView.bindProductTable(this.handleProductTable.bind(this));
  }

  // 투입하기 버튼 클릭 핸들러
  handleChargeButton(event) {
    event.preventDefault();
    const chargeMoney = Number(this.purchaseProductView.getChargeInput());

    // 투입 금액 확인
    if (!isValidPrice(chargeMoney)) return alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");

    this.purchaseProductView.clearInput();
    this.purchaseProductView.updateAmount(this.chargeModel.addUserMoney(chargeMoney));
  }

  // 상품 구매하기 버튼 클릭 핸들러
  handleProductTable(event) {
    event.preventDefault();

    // 구매하기 버튼 눌렀을 때만 동작해야 함
    if (!event.target.classList.contains('purchase-button')) return;

    // target: 이벤트가 발생한 객체, closest(): 현재 element에서 가장 가까운 조상 반환
    const currentRow = event.target.closest('tr');
    const productName = this.purchaseProductView.getProductName(currentRow);
    const productPrice  = this.purchaseProductView.getProductPrice(currentRow);

    if ( productPrice > this.chargeModel.getUserMoney()) return alert("금액이 모자랍니다.");

    this.purchaseProduct(productName, currentRow, productPrice);
  }

  // 상품 구매
  purchaseProduct(productName, currentRow, productPrice) {
    // 수량 수정
    const productQuantity = this.productModel.sellProduct(productName);
    if (productQuantity === 0) currentRow.querySelector('.purchase-button').disabled = true;
  
    this.purchaseProductView.changeProductQuantityByParent(currentRow, productQuantity);
    this.manageProductView.changeProductQuantity(productName, productQuantity);
  
    // 투입한 금액 수정
    const userMoney = this.chargeModel.useUserMoney(productPrice);
    this.purchaseProductView.updateAmount(userMoney);
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
    } else {
      calcMoney = userMoney;
      this.chargeModel.setMachineMoney(machineMoney - userMoney);
    }
    
    this.chargeModel.setUserMoney(0);
    this.returnCoin(calcMoney);
  }

  returnCoin(calcMoney) {
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