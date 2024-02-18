import {Component, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {AttributeListComponent} from './attribute-list/attribute-list.component';
import {AttributeDetailsDialogComponent} from './attribute-details-dialog/attribute-details-dialog.component';
import {CategoryListComponent} from '../categories/category-list/category-list.component';

@Component({
    selector: 'app-attributes',
    standalone: true,
    imports: [
        MatTabsModule,
        AttributeListComponent,
        AttributeDetailsDialogComponent,
        CategoryListComponent
    ],
    templateUrl: './attributes.component.html',
    styleUrl: './attributes.component.scss'
})
export class AttributesComponent {
    @ViewChild('tabGroup') tabGroup!: MatTabGroup;
}
