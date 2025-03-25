// 제품 모델
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // 수량 1개를 뺌
  sellOne() {
    this.quantity -= 1;
  }
}

// 제품 모델
export class ProductModel {
  constructor() {
    this.productList = [];
  }

  // 상품 추가
  addProduct(name, price, quantity) {
    const newProduct = new Product(name, price, quantity);
    this.productList.push(newProduct);  // model list에 저장
    localStorage.setItem('products', JSON.stringify(this.productList)); // localStorage에 저장
    
    return newProduct;
  }

  // 이름 중복 확인 (중복이면 true 반환, 아니면 false 반환)
  isDuplicated(name) {
    return this.productList.some(product => product.name === name);
  }
}