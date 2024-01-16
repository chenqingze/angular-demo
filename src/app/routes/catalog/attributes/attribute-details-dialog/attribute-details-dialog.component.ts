import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AttributeDisplayMode, AttributeType,} from '../shared/attribute';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {AttributeService} from '../shared/attribute.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-attribute-details-dialog',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDialogActions,
        CdkDropList,
        CdkDrag
    ],
    templateUrl: './attribute-details-dialog.component.html',
    styleUrl: './attribute-details-dialog.component.scss'
})
export class AttributeDetailsDialogComponent implements OnInit {

    protected readonly AttributeType = AttributeType;
    protected readonly AttributeDisplayMode = AttributeDisplayMode;
    attributeTypeKeys = Object.keys(this.AttributeType).filter(key => !isNaN(Number(key))).map(key => Number(key));
    attributeDisplayModeKeys = Object.keys(this.AttributeDisplayMode).filter(key => !isNaN(Number(key))).map(key => Number(key));
    attributeId?: string;
    attributeForm = this.fb.group({
        id: this.fb.control<string | undefined>(undefined),
        name: this.fb.control(''),
        displayOrder: this.fb.control(0),
        attributeType: this.fb.control(AttributeType.SELECT),
        attributeDisplayMode: this.fb.control(AttributeDisplayMode.SELECT_BOX),
        isVisible: this.fb.control<boolean | undefined>(false),
        attributeGroupId: this.fb.control<string | undefined>(undefined),
        productClassId: this.fb.control<string | undefined>(undefined),
        productId: this.fb.control<string | undefined>(undefined),
        attributeOptions: this.fb.array([this.fb.group({
            id: this.fb.control<string | undefined>(undefined),
            name: this.fb.control(''),
            displayOrder: this.fb.control(0),
        })]),
    });

    get attributeType() {
        return this.attributeForm.controls.attributeType;
    }

    get attributeOptions() {
        return this.attributeForm.controls.attributeOptions;
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: {
        productClassId?: string
    }, private router: Router, private fb: NonNullableFormBuilder, private attributeService: AttributeService) {
        if (data) {
            const {productClassId} = data;
            if (productClassId) {
                this.attributeForm.setControl('productClassId', this.fb.control(productClassId))
            }
        }

        this.attributeType.valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(type => {
                // AttributeType.SELECT 和AttributeOptionType.HIDDEN 类型的属性 有多个属性选项
                if (type === AttributeType.SELECT || type === AttributeType.HIDDEN) {
                    this.attributeOptions.clear();
                    this.addNewAttributeOption();
                    if (type === AttributeType.HIDDEN) {
                        this.attributeForm.controls.isVisible.setValue(undefined);
                    } else {
                        this.attributeForm.controls.isVisible.setValue(false);
                    }
                } else {
                    this.attributeOptions.clear();
                }
            });
    }

    addNewAttributeOption() {
        const attributeOption = this.fb.group({
            id: this.fb.control<string | undefined>(undefined),
            name: this.fb.control(''),
            displayOrder: this.fb.control(this.attributeOptions?.length || 0)
        });
        this.attributeOptions.push(attributeOption);
    }

    onDropped(event: CdkDragDrop<any [], any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(this.attributeOptions.value, previousIndex, currentIndex);
        this.attributeOptions.value.forEach((item, index) => item.displayOrder = index);
        this.attributeOptions.patchValue([...this.attributeOptions.value]);
    }

    ngOnInit(): void {
    }

    onSubmit() {
        // console.warn(this.attributeForm.getRawValue());
        this.attributeService.createAttribute(this.attributeForm.getRawValue()).subscribe();
    }

    createAttribute() {
        console.log(this.attributeForm.getRawValue());
        console.log(this.attributeForm.value);
        // this.attributeService.createAttribute(this.attributeForm.getRawValue()).subscribe()
    }

    createAttributeOption() {
    }
}
