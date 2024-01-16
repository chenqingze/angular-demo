import {Component, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {ProductClassListComponent} from './product-class-list/product-class-list.component';
import {AttributeListComponent} from './attribute-list/attribute-list.component';
import {AttributeDetailsDialogComponent} from './attribute-details-dialog/attribute-details-dialog.component';

@Component({
    selector: 'app-attributes',
    standalone: true,
    imports: [
        MatTabsModule,
        ProductClassListComponent,
        AttributeListComponent,
        AttributeDetailsDialogComponent
    ],
    templateUrl: './attributes.component.html',
    styleUrl: './attributes.component.scss'
})
export class AttributesComponent {
    @ViewChild('tabGroup') tabGroup!: MatTabGroup;
}
