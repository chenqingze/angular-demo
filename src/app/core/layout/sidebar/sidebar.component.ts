import {Component, Input} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {SideMenuComponent} from '../side-menu/side-menu.component';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        SideMenuComponent,
        MatListModule,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() isMiniNavigation = false;
}
