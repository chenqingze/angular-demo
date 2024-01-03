import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../shared/category';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {forkJoin} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';
import {FormsModule} from '@angular/forms';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        RouterLink,
        MatInputModule,
        MatToolbarModule,
        FormsModule,
        PageFooterComponent
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
    @Input() parentCategoryId: string | undefined;
    displayedColumns: string[] = ['name', 'subcategoryCount', 'isVisible', 'delete'];
    categoryDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
    allCategories: Category[] = [];
    newCategories: Category[] = [];

    constructor(private router: Router, private route: ActivatedRoute, private notificationService: NotificationService, private categoryService: CategoryService) {
    }

    addCategory() {

        const newCategory = !!this.parentCategoryId ? <Category>{
            name: '',
            parentId: this.parentCategoryId
        } : <Category>{name: ''};
        this.newCategories.unshift(newCategory);
        this.categoryDataSource.data = this.newCategories.concat(this.allCategories);
    }

    ngOnInit(): void {
        const initRequest$ = !!this.parentCategoryId ? this.categoryService.getAllSubcategories(this.parentCategoryId) : this.categoryService.getAllCategories();
        initRequest$.subscribe((result) => {
            this.allCategories = result;
            this.categoryDataSource = new MatTableDataSource<Category>(result);
            this.newCategories = [];
        });

    }

    // todo: 排序
    onSubmit() {
        forkJoin(this.newCategories.map(newCategory => this.categoryService.createCategory(newCategory))).subscribe({
            next: () => this.ngOnInit(),
            error: err => this.notificationService.notification$.next(`请求未完成，稍后再试！\n\t 失败原因：${err}`),
        });
    }

    deleteCategory(category: Category, index: number) {
        if (!!category.id) {
            this.categoryService.deleteCategory(category.id).subscribe(() => this.ngOnInit());
        } else {
            this.categoryDataSource.data.splice(index, 1)
            this.categoryDataSource.data = [...this.categoryDataSource.data];
        }
    }
}
