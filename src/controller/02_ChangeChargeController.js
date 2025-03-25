import { isValidPrice, randomCoin } from '../Utils.js';

export class ChangeChargeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    this.view.bindChargeButton(this.handleChargeButton.bind(this));
  }

  handleChargeButton(event) {
    event.preventDefault();
    const chargeMoney = Number(this.view.getChargeInput());

    // 금액 검토
    if (!isValidPrice(chargeMoney)) {
      alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");
      return;
    }

    // 보유 금액 적용
    const machineMoney = this.model.addMachineMoney(machineMoney);
    this.view.updateAmount(machineMoney);

    // 무작위 동전 생성
    const heldMoney = randomCoin(chargeMoney);
    const coinMap = this.model.addCoin(heldMoney);
    this.view.updateCoinQuantity(coinMap);
  }
}