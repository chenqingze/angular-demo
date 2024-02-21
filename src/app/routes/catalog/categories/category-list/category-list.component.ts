import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../shared/category';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {finalize, forkJoin} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';
import {FormsModule} from '@angular/forms';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';
import {DialogService} from '../../../../core/services/dialog.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

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
        PageFooterComponent,
        CdkDropList,
        CdkDrag
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
    @Input() parentCategoryId: string | undefined;
    @ViewChild(MatTable) table!: MatTable<Category>;
    allCategories: Category[] = [];
    newCategories: Category[] = [];
    displayedColumns: string[] = ['dragBox', 'name', 'subcategoryCount', 'enabled', 'delete'];
    categoryDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>(this.allCategories);


    constructor(private notificationService: NotificationService, private dialogService: DialogService, private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService.findAllSubcategories(this.parentCategoryId).subscribe((result) => {
            this.allCategories = result;
            this.categoryDataSource.data = this.allCategories;
            this.newCategories = [];
        });

    }

    addCategory() {
        const newCategory: Category = {name: '', parentId: this.parentCategoryId} as Category;
        this.newCategories.push(newCategory);
        this.categoryDataSource.data = this.newCategories.concat(this.allCategories);
    }

    deleteCategory(category: Category, index: number) {
        if (category.id) {
            this.dialogService.confirmDialog({
                message: `确定删除分类\"${category.name}\"吗?`,
                confirmCaption: '是',
                cancelCaption: '否',
            }).subscribe((choice) => {
                choice && this.categoryService.deleteCategory(category.id!).subscribe(() => this.ngOnInit());
            });
        } else {
            this.newCategories.splice(index, 1)
            this.categoryDataSource.data.splice(index, 1)
            this.categoryDataSource.data = [...this.categoryDataSource.data];
        }
    }

    // todo: 排序
    onDropped(event: CdkDragDrop<any, any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(event.container.data, previousIndex, currentIndex);
        this.table.renderRows();
    }

    onSubmit() {
        forkJoin(this.newCategories.map(newCategory => this.categoryService.createCategory(newCategory)))
            .pipe(finalize(() => this.newCategories = []))
            .subscribe({
                next: () => this.ngOnInit(),
                error: err => this.notificationService.notification$.next(`请求未完成，稍后再试！\n\t 失败原因：${err}`),
            });
    }
}
