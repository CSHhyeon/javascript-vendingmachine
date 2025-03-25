// 잔돈 모델
export class Charge {
  constructor() {
    // 보유 금액
    this.machineMoney = 0;

    // 투입 금액
    this.userMoney = 0;

    // 동전 보유 현황
    this.coin500 = 0;
    this.coin100 = 0;
    this.coin50 = 0;
    this.coin10 = 0;
  }

  // 보유 금액
  getMachineMoney() {
    return this.machineMoney;
  }

  setMachineMoney(money) {
    this.machineMoney = money;
    localStorage.setItem('balance', this.machineMoney);
  }

  addMachineMoney(addMoney) {
    this.machineMoney += addMoney;
    localStorage.setItem('balance', this.machineMoney);

    return this.getMachineMoney();
  }

  // 투입 금액
  getUserMoney() {
    return this.userMoney;
  }

  setUserMoney(inputMoney) {
    this.userMoney = inputMoney;
    localStorage.setItem('userMoney', this.userMoney);
  }

  addUserMoney(inputMoney) {
    this.userMoney += inputMoney;
    localStorage.setItem('userMoney', this.userMoney);

    return this.getUserMoney();
  }

  // 동전 보유 현황
  getCurrentCoin() {
    return new Map([
      [500, this.coin500], [100, this.coin100], [50, this.coin50], [10, this.coin10]
    ]);
  }

  setCurrentCoin(coin500, coin100, coin50, coin10) {
    this.coin500 = coin500;
    this.coin100 = coin100;
    this.coin50 = coin50;
    this.coin10 = coin10;
  }

  addCoin(coinMap) {
    for (const [coin, element] of coinMap) {
      this[`coin${coin}`] += element;
    }

    return this.getCurrentCoin();
  }

  // 현재 가진 금액으로 상품 구매 가능한지 확인
  isAvailablePurchase(price) {
    return this.userMoney >= price;
  }

  // 사용자 금액에서 상품 구매함
  buyProduct(price) {
    this.userMoney -= price;
  }

  // 최소한의 동전 수량 맵 반환
  minimumCoin(money) {
    const coinMap = new Map([
      [500, 0], [100, 0], [50, 0], [10, 0]
    ]);

    while(money >= 10) {
      let coin = 0;
      if (this.coin500 > 0) coin = 500;
      else if (this.coin100 > 0) coin = 100;
      else if (this.coin50 > 0) coin = 50;
      else if (this.coin10 > 0) coin = 10;

      money -= coin;
      this[`coin${coin}`] -= 1;
      coinMap.set(coin, coinMap.get(coin) + 1);
    }
  
    return coinMap;
  }

  // 동전 반환
  returnCharge() {

  }

  // 모두 0으로 초기화
  setChargesZero() {
    this.machineMoney = 0;
    this.userMoney = 0;

    this.coin500 = 0;
    this.coin100 = 0;
    this.coin50 = 0;
    this.coin10 = 0;

    localStorage.setItem('balance', 0);
    localStorage.setItem('userMoney', 0);
  }
}