// 잔돈 모델
export class Charge {
  constructor() {
    // 보유 금액
    this.currentMoney = 0;

    // 동전 보유 현황
    this.coin500 = 0;
    this.coin100 = 0;
    this.coin50 = 0;
    this.coin10 = 0;
  }

  getCurrentMoney() {
    return this.currentMoney;
  }

  setCurrentMoney(addMoney) {
    this.currentMoney += addMoney;
    localStorage.setItem('balance', this.currentMoney);

    return this.getCurrentMoney();
  }

  getCurrentCoin() {
    return new Map([
      [500, this.coin500], [100, this.coin100], [50, this.coin50], [10, this.coin10]
    ]);
  }

  setCoin(coinMap) {
    for (const [coin, element] of coinMap) {
      this[`coin${coin}`] += element;
    }

    return this.getCurrentCoin();
  }
}