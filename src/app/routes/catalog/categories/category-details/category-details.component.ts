import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {NavigationEnd, Router} from '@angular/router';
import {CategoryListComponent} from '../category-list/category-list.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';
import {CategoryInfoComponent} from './category-info/category-info.component';
import {AttributeListComponent} from '../../attributes/attribute-list/attribute-list.component';

@Component({
    selector: 'app-category-details',
    standalone: true,
    imports: [
        MatTabsModule,
        CategoryListComponent,
        CategoryInfoComponent,
        AttributeListComponent,
    ],
    templateUrl: './category-details.component.html',
    styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {
    @ViewChild('tabGroup') tabGroup!: MatTabGroup;
    @Input("id") categoryId!: string;

    constructor(private router: Router) {
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed(),
        ).subscribe(() => {
            this.tabGroup.selectedIndex = 0;
        });
    }

    ngOnInit(): void {
        console.log('======categoryId=======', this.categoryId);
    }

}
