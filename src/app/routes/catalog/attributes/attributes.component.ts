import {Component, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {ProductClassListComponent} from './product-class-list/product-class-list.component';
import {AttributeListComponent} from './attribute-list/attribute-list.component';

@Component({
    selector: 'app-attributes',
    standalone: true,
    imports: [
        MatTabsModule,
        ProductClassListComponent,
        AttributeListComponent
    ],
    templateUrl: './attributes.component.html',
    styleUrl: './attributes.component.scss'
})
export class AttributesComponent {
    @ViewChild('tabGroup') tabGroup!: MatTabGroup;
}
