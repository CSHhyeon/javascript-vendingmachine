// 가격 검증 (정수인지, 100원 이상인지, 10으로 떨어지는지)
export function isValidPrice(price) {
  return Number.isInteger(price) && (price >= 100) && (price % 10 == 0);
}

// 수량 검증 (0 이상인지, 정수인지)
export function isValidQuantity(quantity) {
  return (quantity >= 0) && Number.isInteger(quantity);
}

// pickNumberInList 배열 반환
function randomList(money) {
  if (money >= 500) return [500, 100, 50, 10];
  if (money >= 100) return [100, 50, 10];
  if (money >= 50) return [50, 10];
  if (money >= 10) return [10];
  return [];
}

// 무작위 동전 생성([500, 100, 50, 10] 수량 맵 반환)
export function randomCoin(money) {
  const coinMap = new Map([
    [500, 0], [100, 0], [50, 0], [10, 0]
  ]);

  while(money >= 10) {
    const randomNumber = MissionUtils.Random.pickNumberInList(randomList(money));
    money -= randomNumber;

    coinMap.set(randomNumber, coinMap.get(randomNumber) + 1);
  }

  return coinMap;
}