import {Routes} from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductsComponent} from './products.component';

const productsRoutes: Routes = [
    {path: '', component: ProductsComponent},
    {path: 'add', component: ProductDetailsComponent},
    {path: 'edit/:id', component: ProductDetailsComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
]

export default productsRoutes;