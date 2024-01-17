import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ProductClass} from '../shared/attribute';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';
import {finalize, forkJoin} from 'rxjs';
import {ProductClassService} from '../shared/product-class.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {RouterLink} from '@angular/router';
import {DialogService} from '../../../../core/services/dialog.service';

@Component({
    selector: 'app-product-class-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTableModule,
        CdkDropList,
        FormsModule,
        PageFooterComponent,
        CdkDrag,
        RouterLink
    ],
    templateUrl: './product-class-list.component.html',
    styleUrl: './product-class-list.component.scss'
})
export class ProductClassListComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<ProductClass>;
    productClassDataSource = new MatTableDataSource<ProductClass>([]);
    displayedColumns: string[] = ['dragBox', 'name', 'operate'];
    allProductClasses: ProductClass [] = [];
    newProductClasses: ProductClass[] = [];

    constructor(private productClassService: ProductClassService, private dialogService: DialogService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.productClassService.findAllProductClasses().subscribe(result => {
            this.allProductClasses = result;
            this.productClassDataSource.data = this.allProductClasses;
            this.newProductClasses = [];
        })
    }

    addProductClass() {
        const productClass: ProductClass = {name: '', displayOrder: 0};
        this.newProductClasses.push(productClass);
        this.productClassDataSource.data = this.newProductClasses.concat(this.allProductClasses);
    }

    deleteProductClass(productClass: ProductClass, index: number) {
        if (productClass.id) {
            this.dialogService.confirmDialog({
                message: `确定删除类别\"${productClass.name}\"吗?`,
                confirmCaption: '是',
                cancelCaption: '否',
            }).subscribe((choice) => {
                choice && this.productClassService.deleteProductClass(productClass.id!).subscribe(() => this.ngOnInit());
            });
        } else {
            this.newProductClasses.splice(index, 1);
            this.productClassDataSource.data.splice(index, 1)
            this.productClassDataSource.data = [...this.productClassDataSource.data];
        }
    }

    onDropped(event: CdkDragDrop<any, any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(event.container.data, previousIndex, currentIndex);
        this.table.renderRows();
    }

    onSubmit() {
        forkJoin(this.newProductClasses.map(newProductClass => this.productClassService.createProductClass(newProductClass)))
            .pipe(finalize(() => this.newProductClasses = []))
            .subscribe({
                next: () => this.ngOnInit(),
                error: err => this.notificationService.notification$.next(`请求未完成，稍后再试！\n\t 失败原因：${err}`),
            });
    }


}
