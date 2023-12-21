import {Component, Input} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {MenuItem} from '../../../../shared/models/menu-item';

@Component({
    selector: 'app-menu-item',
    standalone: true,
    imports: [
        MatListModule,
        MatIconModule,
        MatMenuModule,
        RouterLink
    ],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

    @Input() isExpanded: boolean = false;
    @Input() depth: number = 0;
    @Input({required: true}) menuItem!: MenuItem;

    get hasChildren() {
        return this.menuItem.children && this.menuItem.children?.length > 0;
    }

}
