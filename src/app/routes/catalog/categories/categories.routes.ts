import {Routes} from '@angular/router';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';

const categoriesRoutes: Routes = [
    {path: '', component: CategoryListComponent},
    {path: 'add', component: CategoryDetailsComponent},
    {path: 'edit/:id', component: CategoryDetailsComponent},
    {path: 'detail/:id', component: CategoryDetailsComponent},
]
export default categoriesRoutes;