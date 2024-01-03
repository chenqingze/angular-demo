import {Component} from '@angular/core';
import {CategoryListComponent} from './category-list/category-list.component';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CategoryListComponent
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    constructor() {
    }
}
