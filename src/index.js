import {changeTab} from './탭/ChangeTab.js';

// model
import { ProductModel } from './model/Product.js';
import { Charge } from './model/Charge.js';

// view
import { ManageProductView } from './view/01_ManageProductView.js';
import { ChangeChargeView } from './view/02_ChangeChargeView.js';
import { PurchaseProductView } from './view/03_PurchaseProductView.js';

// controller
import { ManageProductController } from './controller/01_ManageProuductController.js';
import { ChangeChargeController } from './controller/02_ChangeChargeController.js';
import { PurchaseProductController } from './controller/03_PurchaseProductController.js';

// 탭 변경용
new changeTab();

const product = new ProductModel();
const charge = new Charge();

const manageProductView = new ManageProductView();
const changeChargeView = new ChangeChargeView();
const purchaseProductView = new PurchaseProductView();

// 상품 관리
new ManageProductController(product, manageProductView, purchaseProductView);

// 잔돈 충전
new ChangeChargeController(charge, changeChargeView);

// 상품 구매
new PurchaseProductController(charge, product, manageProductView, changeChargeView, purchaseProductView);