import { isValidPrice, randomCoin } from '../Utils.js';

export class ChangeChargeController {
  constructor(chargeModel, changeChargeView) {
    this.chargeModel = chargeModel;
    this.changeChargeView = changeChargeView;
    this.init();
    this.bindEvents();
  }

  init() {
    this.chargeModel.loadMachineMoneyFromLS();
    this.chargeModel.loadCoinFromLS();

    this.changeChargeView.updateAmount(this.chargeModel.getMachineMoney());
    this.changeChargeView.updateCoinQuantity(this.chargeModel.getCurrentCoin());
  }

  bindEvents() {
    this.changeChargeView.bindChargeButton(this.handleChargeButton.bind(this));
  }

  handleChargeButton(event) {
    event.preventDefault();
    const chargeMoney = Number(this.changeChargeView.getChargeInput());

    // 금액 검토
    if (!isValidPrice(chargeMoney)) {
      alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");
      return;
    }

    this.chargeModel.clearInput();

    // 보유 금액 적용
    const machineMoney = this.chargeModel.addMachineMoney(chargeMoney);
    this.changeChargeView.updateAmount(machineMoney);

    // 무작위 동전 생성
    const heldMoney = randomCoin(chargeMoney);
    const coinMap = this.chargeModel.addCoin(heldMoney);
    this.changeChargeView.updateCoinQuantity(coinMap);
  }
}