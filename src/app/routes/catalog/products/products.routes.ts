import {Routes} from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductsComponent} from './products.component';
import {ProductInfoComponent} from './product-info/product-info.component';

const productsRoutes: Routes = [
    {path: '', component: ProductsComponent},
    {path: 'add', component: ProductInfoComponent},
    {path: 'edit/:id', component: ProductInfoComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
]

export default productsRoutes;