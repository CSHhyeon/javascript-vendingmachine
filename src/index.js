import {changeTab} from './탭/ChangeTab.js';

import { ProductModel } from './model/Product.js';
import { ManageProductView } from './view/01_ManageProductView.js';
import { PurchaseProductView } from './view/03_PurchaseProductView.js';
import { ManageProductController } from './controller/01_ManageProuductController.js';

// 탭 변경용
new changeTab();

// 상품 관리
const model = new ProductModel();
const manageProductView = new ManageProductView();
const purchaseProductView = new PurchaseProductView();
new ManageProductController(model, manageProductView, purchaseProductView);

// 잔돈 충전

// 상품 구매