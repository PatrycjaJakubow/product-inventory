import { Routes } from "@angular/router";
import { AddEditProductComponent } from "./edit-product/edit-product.component";
import { ProductListComponent } from "./product-list/product-list.component";

const routeConfig: Routes = [
    {
      path: 'edit-product',
      component: AddEditProductComponent,
      title: 'Edit Product',
    },
    {
        path:'product-list',
        component: ProductListComponent,
        title: 'Product List Component'
    }
]

export default routeConfig;