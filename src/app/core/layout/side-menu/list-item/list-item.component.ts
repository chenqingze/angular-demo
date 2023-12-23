import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../../../shared/models/menu-item';
import {NgStyle} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-list-item',
    standalone: true,
    imports: [
        RouterLink,
        MatListModule,
        MatIconModule,
        NgStyle,
        MatButtonModule
    ],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss'
})
export class ListItemComponent {

    @Input() isExpanded: boolean = false;
    @Input() depth: number = 0;
    @Input({required: true}) menuItem!: MenuItem;


    constructor(public router: Router) {
    }

    get hasChildren() {
        return !!this.menuItem.children && this.menuItem.children?.length > 0;
    }

}
