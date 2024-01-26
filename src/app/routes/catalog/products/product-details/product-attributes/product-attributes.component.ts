import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ProductSpecificAttributeComponent} from './product-specific-attribute/product-specific-attribute.component';
import {ProductClassAttributeComponent} from './product-class-attribute/product-class-attribute.component';
import {GlobalAttributeComponent} from './global-attribute/global-attribute.component';
import {HiddenAttributeComponent} from './hidden-attribute/hidden-attribute.component';

@Component({
    selector: 'app-product-attributes',
    standalone: true,
    imports: [
        MatButtonToggleModule,
        ProductSpecificAttributeComponent,
        ProductClassAttributeComponent,
        GlobalAttributeComponent,
        HiddenAttributeComponent
    ],
    templateUrl: './product-attributes.component.html',
    styleUrl: './product-attributes.component.scss'
})
export class ProductAttributesComponent {

}
