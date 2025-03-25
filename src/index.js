import {changeTab} from './탭/ChangeTab.js';

import { ProductModel } from './model/Product.js';
import { ManageProductView } from './view/01_ManageProductView.js';
import { ManageProductController } from './controller/01_ManageProuductController.js';

// 탭 변경용
new changeTab();

// 상품 관리
const model = new ProductModel();
const view = new ManageProductView();
new ManageProductController(model, view);

// 잔돈 충전

// 상품 구매