import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Attribute} from '../../attributes/shared/attribute';
import {Product} from '../shared/product';
import {Router, RouterLink} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CdkDrag,
        CdkDropList,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTableModule,
        MatCheckboxModule,
        PageFooterComponent,
        MatButtonToggleModule,
        MatMenuModule,
        RouterLink,
        MatPaginatorModule
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatTable) table!: MatTable<Attribute>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    pageSize = 10;

    pageSizeOptions = [5, 10, 25];
    productDataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
    displayedColumns: string[] = ['select', 'enabled', 'name', 'price', 'costPrice', 'operate'];
    selection = new SelectionModel<Product>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.productDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.productDataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Product): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
    }

    constructor(private router: Router, private productService: ProductService) {
    }

    ngOnInit(): void {
        this.loadPageData();
    }

    ngAfterViewInit() {
        this.productDataSource.paginator = this.paginator;
    }

    deleteProduct(productId: string) {

    }

    onPage(event: PageEvent) {
        this.selection.clear();
        const previousPageIndex = event.previousPageIndex;
        const pageIndex = event?.pageIndex || 0;
        const pageSize = event?.pageSize;
        if (pageSize) {
            this.loadPageData(0, pageSize);
        } else {
            this.loadPageData(pageIndex, this.paginator.pageSize);
        }

        return event;
    }

    loadPageData(pageIndex = 0, pageSize = 10) {
        this.productService.getProducts(pageIndex, pageSize).subscribe(page => {
            this.productDataSource.data = page.content;
            this.paginator.pageIndex = page.number;
            this.paginator.pageSize = page.size;
            this.paginator.length = page.totalElements;
        });
    }
}
