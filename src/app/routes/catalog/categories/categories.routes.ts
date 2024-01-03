import {Routes} from '@angular/router';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoriesComponent} from './categories.component';

const categoriesRoutes: Routes = [
    {path: '', component: CategoriesComponent},
    {path: 'add', component: CategoryDetailsComponent},
    {path: 'edit/:id', component: CategoryDetailsComponent},
    {path: 'details/:id', component: CategoryDetailsComponent},
]
export default categoriesRoutes;