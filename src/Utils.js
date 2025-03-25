// 가격 검증 (정수인지, 100원 이상인지, 10으로 떨어지는지)
export function isValidPrice(price) {
  return Number.isInteger(price) && (price >= 100) && (price % 10 == 0);
}

// 수량 검증 (0 이상인지, 정수인지)
export function isValidQuantity(quantity) {
  return (quantity >= 0) && Number.isInteger(quantity);
}

// 무작위 동전 생성([500, 100, 50, 10] 수량 배열 반환)
export function randomCoin() {
  const randomNumber = MissionUtils.Random.pickNumberInList([10, 50, 100, 500]);
  // TODO
}