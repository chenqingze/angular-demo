import {Routes} from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductsComponent} from './products.component';
import {AddEditProductComponent} from './add-edit-product/add-edit-product.component';

const productsRoutes: Routes = [
    {path: '', component: ProductsComponent},
    {path: 'add', component: AddEditProductComponent},
    {path: 'edit/:id', component: AddEditProductComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
]

export default productsRoutes;