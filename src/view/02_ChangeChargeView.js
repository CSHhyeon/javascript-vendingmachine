// 잔돈 충전 View
export class ChangeChargeView {
  constructor() {
    // 동전 충전
    this.chargeInput = document.querySelector("#vending-machine-charge-input");
    this.chargeButton = document.querySelector("#vending-machine-charge-button");
    this.chargeAmount = document.querySelector("#vending-machine-charge-amount");

    // 동전 보유 현황
    this.coinQuantities = new Map([
      [500, document.querySelector("#vending-machine-coin-500-quantity")],
      [100, document.querySelector("#vending-machine-coin-100-quantity")],
      [50, document.querySelector("#vending-machine-coin-50-quantity")],
      [10, document.querySelector("#vending-machine-coin-10-quantity")],
    ]);
  }

  /* 입력값 반환 */
  getChargeInput() {
    return this.chargeInput.value;
  }

  /* 이벤트 핸들러 바인딩 */
  bindChargeButton(handler) {
    this.chargeButton.addEventListener("click", handler);
  }

  // 보유 금액 update
  updateAmount(amount) {
    this.chargeAmount.replaceChildren(document.createTextNode(amount + "원"));
  }

  // 동전 개수 update
  updateCoinQuantity(coinMap) {
    for (const [coin, element] of this.coinQuantities) {
      element.replaceChildren(document.createTextNode(`${coinMap.get(coin)}개`));
    }
  }

  clearInput() {
    this.chargeInput.value = "";
  }
}