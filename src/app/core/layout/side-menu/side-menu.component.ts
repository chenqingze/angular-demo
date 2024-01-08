import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {menuList} from '../../../data/menu';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {ListItemComponent} from './list-item/list-item.component';
import {MenuItem} from '../../../shared/models/menu-item';

@Component({
    selector: 'app-side-menu',
    standalone: true,
    imports: [
        MatIconModule,
        MatListModule,
        RouterLink,
        MatMenuModule,
        MatButtonModule,
        MenuItemComponent,
        ListItemComponent
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

    @Input() isMiniNavigation: boolean = false;
    menu: MenuItem[] = menuList || [];

    hasChildren(menuItem: MenuItem): boolean {
        return !!menuItem.children && menuItem.children?.length > 0;
    }
}
