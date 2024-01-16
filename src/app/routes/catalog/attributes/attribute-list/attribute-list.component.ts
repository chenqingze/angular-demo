import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {Attribute} from '../shared/attribute';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import {AttributeDetailsDialogComponent} from '../attribute-details-dialog/attribute-details-dialog.component';
import {AttributeService} from '../shared/attribute.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-attribute-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        CdkDropList,
        CdkDrag
    ],
    templateUrl: './attribute-list.component.html',
    styleUrl: './attribute-list.component.scss'
})
export class AttributeListComponent implements OnInit {

    @Input('productClassId') productClassId?: string;
    @ViewChild(MatTable) table!: MatTable<Attribute>;
    attributeDataSource: MatTableDataSource<Attribute> = new MatTableDataSource<Attribute>([]);
    displayedColumns: string[] = ['dragBox', 'name', 'attributeType', 'isVisible', 'attributeDisplayMode', 'operate'];

    constructor(private dialog: MatDialog, private attributeService: AttributeService) {

    }

    ngOnInit(): void {
        if (this.productClassId) {
            this.attributeService.findAllProductClassAttributes(this.productClassId).subscribe(result => this.attributeDataSource.data = result);
        } else {
            this.attributeService.findAllGlobalAttributes().subscribe(result => this.attributeDataSource.data = result);
        }
    }

    onDropped(event: CdkDragDrop<any, any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(event.container.data, previousIndex, currentIndex);
        this.table.renderRows();
    }

    addAttribute() {
        this.dialog.open(AttributeDetailsDialogComponent, {data: this.productClassId}).afterClosed().subscribe(result => result && this.ngOnInit());
    }

    deleteAttribute(attribute: Attribute) {

    }
}
