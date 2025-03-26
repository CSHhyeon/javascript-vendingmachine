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

  // 가격 변경
  setPrice(price) {
    this.price = price;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  addQuantity(quantity) {
    this.quantity += quantity;
  }
}

// 제품 모델
export class ProductModel {
  constructor() {
    // key: 상품 이름, value: 상품 객체
    this.productMap = new Map();
  }

  saveToLocalStorage() {
    const productArray = [...this.productMap.entries()];
    localStorage.setItem("products", JSON.stringify(productArray));
  }

  loadFromLocalStorage() {
    const getLocal = localStorage.getItem("products");
    if (!getLocal) return;

    const productArray = JSON.parse(getLocal);
    for (const [name, product] of productArray) {
      const productObj = new Product(product.name, product.price, product.quantity);
      this.productMap.set(name, productObj);
    }
  }

  // product Map 반환
  getProducts() {
    return this.productMap;
  }

  // 가격 & 수량 변경
  changeInfo(name, price, quantity) {
    const product = this.productMap.get(name);
    product.setPrice(price);
    product.addQuantity(quantity);
    this.saveToLocalStorage();

    return product.quantity;
  }

  // 수량 변경
  addQuantity(name, quantity) {
    const product = this.productMap.get(name);
    product.addQuantity(quantity);
    this.saveToLocalStorage();

    return product.quantity;
  }

  // 상품 Map에 추가
  addProduct(name, price, quantity) {
    const newProduct = new Product(name, price, quantity);
    this.productMap.set(name, newProduct); // model map에 저장
    this.saveToLocalStorage(); // localStorage에 저장
    
    return newProduct;
  }

  // 상품 수량 수정 & 수정 후 수량 반환
  sellProduct(name) {
    const product = this.productMap.get(name);
    product.sellOne();
    this.saveToLocalStorage();

    return product.quantity;
  }

  // 이름 중복 확인 (중복이면 true 반환, 아니면 false 반환)
  isDuplicatedName(name) {
    return this.productMap.has(name);
  }

  // 이름, 가격 모두 같은지 확인 (모두 같으면 true 반환)
  isDuplicatedProduct(name, price) {
    const product = this.productMap.get(name);
    return this.productMap.has(name) && product.price === price;
  }
}