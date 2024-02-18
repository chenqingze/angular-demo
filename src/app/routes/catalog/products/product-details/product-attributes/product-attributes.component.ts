import {Component, Input} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ProductSpecificAttributeComponent} from './product-specific-attribute/product-specific-attribute.component';
import {CategoryAttributeComponent} from './category-attribute/category-attribute.component';
import {GlobalAttributeComponent} from './global-attribute/global-attribute.component';
import {HiddenAttributeComponent} from './hidden-attribute/hidden-attribute.component';

@Component({
    selector: 'app-product-attributes',
    standalone: true,
    imports: [
        MatButtonToggleModule,
        ProductSpecificAttributeComponent,
        CategoryAttributeComponent,
        GlobalAttributeComponent,
        HiddenAttributeComponent
    ],
    templateUrl: './product-attributes.component.html',
    styleUrl: './product-attributes.component.scss'
})
export class ProductAttributesComponent {
    @Input({required: true}) productId!: string;
}
