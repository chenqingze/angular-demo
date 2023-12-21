import {Routes} from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductListComponent} from './product-list/product-list.component';

const productsRoutes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'add', component: ProductDetailsComponent},
    {path: 'edit/:id', component: ProductDetailsComponent},
    {path: 'detail/:id', component: ProductDetailsComponent},
]

export default productsRoutes;