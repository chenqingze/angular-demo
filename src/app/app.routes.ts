import {Routes} from '@angular/router';
import {LoginComponent} from './routes/auth/login/login.component';
import {RegisterComponent} from './routes/auth/register/register.component';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {authGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './core/layout/layout.component';
import {appGuard} from './core/guards/app.guard';
import {Error404Component} from './routes/error-page/404.component';
import {Error403Component} from './routes/error-page/403.component';
import {Error500Component} from './routes/error-page/500.component';

export const routes: Routes = [

    {
        path: '', component: LayoutComponent,
        canActivate: [appGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'products', loadChildren: () => import('./routes/catalog/products/products.routes')},
            {path: 'categories', loadChildren: () => import('./routes/catalog/categories/categories.routes')},
            {path: 'attributes', loadChildren: () => import('./routes/catalog/attributes/attributes.routes')},

        ]
    },

    // auth
    {path: 'login', canActivate: [authGuard], component: LoginComponent},
    {path: 'register', canActivate: [authGuard], component: RegisterComponent},

    // error
    {path: '403', component: Error403Component},
    {path: '404', component: Error404Component},
    {path: '500', component: Error500Component},

    // demo
    {path: 'demo', loadChildren: () => import('./demo/demo.routes')},

    // other
    {path: '**', component: Error404Component}
];
