import {Component, Input} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {SideMenuComponent} from '../side-menu/side-menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatListModule,
        SideMenuComponent,
        MatSlideToggleModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() isMobile = false;
}
