import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ProductListComponent} from './product-list/product-list.component';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        MatTabsModule,
        ProductListComponent
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
