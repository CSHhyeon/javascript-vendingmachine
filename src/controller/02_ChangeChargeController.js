import { isValidPrice, randomCoin } from '../Utils.js';

export class ChangeChargeController {
  constructor(chargeModel, changeChargeView) {
    this.chargeModel = chargeModel;
    this.changeChargeView = changeChargeView;
    this.init();
    this.bindEvents();
  }

  // 새로고침 시 localStorage 정보 가지고 와서 html 렌더링
  init() {
    this.chargeModel.loadMachineMoneyFromLS();
    this.chargeModel.loadCoinFromLS();

    this.changeChargeView.updateAmount(this.chargeModel.getMachineMoney());
    this.changeChargeView.updateCoinQuantity(this.chargeModel.getCurrentCoin());
  }

  // '충전하기' 버튼 바인딩
  bindEvents() {
    this.changeChargeView.bindChargeButton(this.handleChargeButton.bind(this));
  }

  // '충전하기' 버튼 클릭 핸들러
  handleChargeButton(event) {
    event.preventDefault();
    const chargeMoney = Number(this.changeChargeView.getChargeInput());

    // 금액 유효성 확인
    if (!isValidPrice(chargeMoney)) return alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");

    // 보유 금액 충전 & 동전 생성
    this.addMachineMoney(chargeMoney);
    this.changeChargeView.clearInput();
  }

  addMachineMoney(chargeMoney) {
    // 보유 금액 적용
    const machineMoney = this.chargeModel.addMachineMoney(chargeMoney);
    this.changeChargeView.updateAmount(machineMoney);

    // 무작위 동전 생성
    const heldMoney = randomCoin(chargeMoney);
    const coinMap = this.chargeModel.addCoin(heldMoney);
    this.changeChargeView.updateCoinQuantity(coinMap);
  }
}