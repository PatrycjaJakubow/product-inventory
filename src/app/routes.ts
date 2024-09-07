import { Routes } from "@angular/router";
import { AddEditProductComponent } from "./add-edit-product/add-edit-product.component";
import { ProductListComponent } from "./product-list/product-list.component";

const routeConfig: Routes = [
    {
      path: 'add-edit-product',
      component: AddEditProductComponent,
      title: 'Add Edit Product',
    },
    {
        path:'product-list',
        component: ProductListComponent,
        title: 'Product List Component'
    }
]

export default routeConfig;