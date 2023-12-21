import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {LoginComponent} from './routes/auth/login/login.component';
import {RegisterComponent} from './routes/auth/register/register.component';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {appGuard} from './core/guards/app.guard';
import {authGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './core/layout/layout.component';

export const routes: Routes = [

    {
        path: '', component: LayoutComponent,
        canActivate: [appGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'products', loadChildren: () => import('./routes/catalog/products/products.routes')},
            {path: 'categories', loadChildren: () => import('./routes/catalog/categories/categories.routes')},
        ]
    },
    // auth
    {path: 'login', canActivate: [authGuard], component: LoginComponent},
    {path: 'register', canActivate: [authGuard], component: RegisterComponent},
    {path: '**', component: PageNotFoundComponent}
];
