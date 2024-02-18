import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTable, MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {Attribute, AttributeGroup} from '../shared/attribute';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import {AttributeDetailsDialogComponent} from '../attribute-details-dialog/attribute-details-dialog.component';
import {AttributeService} from '../shared/attribute.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {AttributeGroupsDialogComponent} from '../attribute-groups-dialog/attribute-groups-dialog.component';
import {AttributeGroupService} from '../shared/attribute-group.service';
import {forkJoin} from 'rxjs';
import {NgStyle} from '@angular/common';

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
        CdkDrag,
        NgStyle
    ],
    templateUrl: './attribute-list.component.html',
    styleUrl: './attribute-list.component.scss'
})
export class AttributeListComponent implements OnInit {

    @Input() categoryId?: string;
    @ViewChild(MatTable) table!: MatTable<Attribute>;
    // attributeDataSource: MatTableDataSource<Attribute> = new MatTableDataSource<Attribute>([]);
    displayedColumns: string[] = ['dragBox', 'name', 'attributeType', 'attributeDisplayMode', 'operate'];
    attributeGroups: AttributeGroup [] = [];

    constructor(private route: ActivatedRoute, private dialog: MatDialog, private attributeService: AttributeService, private attributeGroupService: AttributeGroupService) {
    }

    ngOnInit(): void {
        forkJoin([
            this.attributeGroupService.findAllAttributeGroups(this.categoryId),
            this.attributeService.findAttributes(this.categoryId)]
        ).subscribe(([attributeGroups, attributes]) => {
            const nonGroup: AttributeGroup = {
                id: undefined, name: '未分组', displayOrder: 0,
                categoryId: this.categoryId
            }
            this.attributeGroups = [nonGroup, ...attributeGroups].map(group => {
                const attributeGroup = {...group};
                const groupId = attributeGroup.id;
                attributeGroup.attributes = attributes.filter(attribute => attribute.attributeGroupId == groupId);
                return attributeGroup;
            });
        });


    }

    manageAttributeGroups() {
        this.dialog.open(AttributeGroupsDialogComponent, {data: this.categoryId}).afterClosed().subscribe();
    }

    onDropped(event: CdkDragDrop<any, any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(event.container.data, previousIndex, currentIndex);
        this.table.renderRows();
    }

    addAttribute() {
        // console.log(this.categoryId)
        this.dialog.open(AttributeDetailsDialogComponent, {data: {categoryId: this.categoryId}})
            .afterClosed()
            .subscribe(result => result && this.ngOnInit());
    }

    editAttribute(attributeId: string) {
        this.dialog.open(AttributeDetailsDialogComponent, {data: {categoryId: this.categoryId, attributeId}})
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.ngOnInit();
                }
            });
    }

    deleteAttribute(attributeId: string) {
        this.attributeService.deleteAttribute(attributeId).subscribe(() => this.ngOnInit());
    }


}
