import {changeTab} from './탭/ChangeTab.js';

// model
import { ProductModel } from './model/Product.js';
import { Charge } from './model/Charge.js';

// view
import { TemplateView } from './view/00_templateView.js';
import { ManageProductView } from './view/01_ManageProductView.js';
import { ChangeChargeView } from './view/02_ChangeChargeView.js';
import { PurchaseProductView } from './view/03_PurchaseProductView.js';

// controller
import { ManageProductController } from './controller/01_ManageProuductController.js';
import { ChangeChargeController } from './controller/02_ChangeChargeController.js';
import { PurchaseProductController } from './controller/03_PurchaseProductController.js';

// UI 초기화
new TemplateView();

document.addEventListener('templateLoaded', () => {
  // 탭 변경용
  new changeTab();

  // model
  const product = new ProductModel();
  const charge = new Charge();

  // view
  const manageProductView = new ManageProductView();
  const changeChargeView = new ChangeChargeView();
  const purchaseProductView = new PurchaseProductView();

  // controller
  new ManageProductController(product, manageProductView, purchaseProductView); // 상품 관리
  new ChangeChargeController(charge, changeChargeView); // 잔돈 충전
  new PurchaseProductController(charge, product, manageProductView, changeChargeView, purchaseProductView); // 상품 구매
});