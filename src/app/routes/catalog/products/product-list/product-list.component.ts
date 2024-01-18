import {Component, OnInit, ViewChild} from '@angular/core';
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
        RouterLink
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<Attribute>;
    productDataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
    displayedColumns: string[] = ['select', 'enabled', 'name', 'categories', 'price', 'costPrice', 'operate'];
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
    }

    deleteProduct(productId: string) {

    }
}
