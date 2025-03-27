import { isValidPrice, isValidQuantity } from '../Utils.js';

export class ManageProductController {
  constructor(productModel, manageProductView, purchaseProductView) {
    this.productModel = productModel;
    this.manageProductView = manageProductView;
    this.purchaseProductView = purchaseProductView;
    this.init();
    this.bindEvents();
  }

  // 새로고침 시 localStorage 정보 가지고 와서 html 렌더링
  init() {
    this.productModel.loadFromLocalStorage();
    const productMap = this.productModel.getProducts();

    for (const product of productMap.values()) {
      this.manageProductView.addNewProduct(product);
      this.purchaseProductView.addProduct(product);
    }
  }
  
  // '추가하기' 버튼 바인딩
  bindEvents() {
    this.manageProductView.bindProductAddButton(this.handleProductAddButton.bind(this));
  }

  // '추가하기' 버튼 클릭 핸들러
  handleProductAddButton(event) {
    event.preventDefault();
    const { name, price, quantity } = this.manageProductView.getProductData();
    const trimName = name.trim();

    // 가격 & 수량 유효성 확인
    if (!isValidPrice(price)) return alert("100원 이상의 10으로 떨어지는 정수를 입력하세요.");
    if (!isValidQuantity(quantity)) return alert("0 이상의 정수를 입력하세요.");

    // 이름 & 가격 중복 확인! 
    if (this.productModel.isDuplicatedProduct(trimName, price)) {   // 이름, 가격이 모두 같으면 수량 늘림
      return confirm("이미 존재하는 제품입니다. 수량을 늘리시겠습니까?") ? this.addQuantity(trimName, quantity) : null;
    }

    if (this.productModel.isDuplicatedName(trimName)) {   // 이름만 같고 나머지가 다르면 가격, 수량 바꿈
      return confirm("이미 존재하는 제품입니다. 가격을 변경하고, 수량을 늘리시겠습니까?") ? this.changePrice(trimName, price, quantity) : null;
    }
    
    this.addNewProduct(trimName, price, quantity);  // 이름, 가격, 수량 모두 다르면 새로운 제품 추가
  }

  // 수량 증가 (상품 관리 & 상품 구매 페이지 모두 동일하게 증가시킴)
  addQuantity(name, quantity) {
    const changedQuantity = this.productModel.addQuantity(name, quantity);
    this.manageProductView.updateProductInfo(name, { quantity: changedQuantity });
    this.purchaseProductView.updateProductInfo(name, { quantity: changedQuantity });
    this.manageProductView.clearInput();
  }

  // 기존 제품 정보 수정 (가격, 수량 변경)
  changePrice(name, price, quantity) {
    const changedQuantity = this.productModel.changeInfo(name, price, quantity);
    this.manageProductView.updateProductInfo(name, { price: price, quantity: changedQuantity });
    this.purchaseProductView.updateProductInfo(name, { price: price, quantity: changedQuantity });
    this.manageProductView.clearInput();
  }

  // 새로운 제품 추가
  addNewProduct(name, price, quantity) {
    const product = this.productModel.addProduct(name, price, quantity);
    this.manageProductView.addNewProduct(product);
    this.purchaseProductView.addProduct(product);
    this.manageProductView.clearInput();
  }
}