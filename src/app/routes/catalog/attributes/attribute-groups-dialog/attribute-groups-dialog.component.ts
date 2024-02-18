import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {AttributeGroupService} from '../shared/attribute-group.service';
import {AttributeGroup} from '../shared/attribute';
import {finalize, forkJoin} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';

@Component({
    selector: 'app-attribute-groups-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CdkDrag,
        CdkDropList,
        MatButtonModule,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogClose,
        CdkDragPlaceholder,
        FormsModule
    ],
    templateUrl: './attribute-groups-dialog.component.html',
    styleUrl: './attribute-groups-dialog.component.scss'
})
export class AttributeGroupsDialogComponent implements OnInit {

    allAttributeGroups: AttributeGroup [] = [];
    attributeGroups: AttributeGroup[] = [];
    newAttributeGroups: AttributeGroup[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public categoryId: string, private dialogRef: MatDialogRef<AttributeGroupsDialogComponent, boolean>, private notificationService: NotificationService, private attributeGroupService: AttributeGroupService) {
    }

    ngOnInit(): void {
        this.attributeGroupService.findAllAttributeGroups(this.categoryId).subscribe(result => {
            this.allAttributeGroups = result;
            this.attributeGroups = result;
            this.newAttributeGroups = [];
        });
    }

    addAttributeGroup() {
        const newAttributeGroup = {
            id: '',
            name: '',
            displayOrder: 0,
            categoryId: this.categoryId,
        }
        this.newAttributeGroups.push(newAttributeGroup);
        this.attributeGroups = this.allAttributeGroups.concat(this.newAttributeGroups);
    }

    onDropped(event: CdkDragDrop<any[], any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(this.allAttributeGroups, previousIndex, currentIndex);
        this.allAttributeGroups.forEach((item, index) => item.displayOrder = index);
        // this.allAttributeGroups = [...this.allAttributeGroups];
    }

    deleteAttributeGroup(idx: number) {
        const attributeGroupId = this.allAttributeGroups.at(idx)?.id
        if (attributeGroupId) {
            this.attributeGroupService.deleteAttributeGroup(attributeGroupId).subscribe(() => this.ngOnInit());
        } else {
            this.attributeGroups.splice(idx, 1);
            this.newAttributeGroups.splice(idx - this.attributeGroups.length, 1);
        }
    }

    onSubmit() {

        forkJoin(this.newAttributeGroups.map(newAttributeGroup => this.attributeGroupService.createAttributeGroup(newAttributeGroup)))
            .pipe(finalize(() => {
                this.newAttributeGroups = [];
                this.dialogRef.close(true)
            }))
            .subscribe({
                next: () => {
                },
                error: err => this.notificationService.notification$.next(`请求未完成，稍后再试！\n\t 失败原因：${err}`),
            });
    }


}
