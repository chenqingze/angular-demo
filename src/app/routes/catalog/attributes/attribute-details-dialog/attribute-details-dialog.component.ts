import {Component, Inject, OnInit} from '@angular/core';
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
import {MatSelectModule} from '@angular/material/select';
import {FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AttributeDataType, AttributeDataTypes, AttributeType, AttributeTypes,} from '../shared/attribute';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {AttributeService} from '../shared/attribute.service';

interface AttributeOptionForm {
    id: FormControl<string | undefined>,
    value: FormControl<string>,
    displayOrder: FormControl<number>,
}

interface AttributeForm {
    id: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>
    attributeType: FormControl<AttributeType>;
    attributeDataType: FormControl<AttributeDataType>;
    attributeOptions: FormArray<FormGroup<AttributeOptionForm>>;
}

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

    protected readonly AttributeTypes = AttributeTypes;
    protected readonly AttributeDataTypes = AttributeDataTypes;

    attributeForm: FormGroup<AttributeForm> = this.fb.group<AttributeForm>({
        id: this.fb.control<string | undefined>(undefined),
        name: this.fb.control(''),
        displayOrder: this.fb.control(0),
        attributeType: this.fb.control<AttributeType>('LIST_OF_VALUES'),
        attributeDataType: this.fb.control<AttributeDataType>('STRING'),
        attributeOptions: this.fb.array<FormGroup<AttributeOptionForm>>([]),
    });

    get attributeType() {
        return this.attributeForm.controls.attributeType;
    }

    get attributeOptions() {
        return this.attributeForm.controls.attributeOptions;
    }

    constructor(@Inject(MAT_DIALOG_DATA) public attributeId: string | undefined, private dialogRef: MatDialogRef<AttributeDetailsDialogComponent, boolean>, private fb: NonNullableFormBuilder, private attributeService: AttributeService) {
        this.attributeType.valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(type => {
                if (type === 'LIST_OF_VALUES') {
                    this.attributeOptions.clear();
                    this.addAttributeOption();
                }
            });
    }

    ngOnInit(): void {
        if (this.attributeId) {
            this.attributeService.getAttribute(this.attributeId).subscribe(result => {
                const attributeOptionSize = result.attributeOptions?.length;
                if (attributeOptionSize) {
                    this.attributeOptions.clear();
                    for (let i = 0; i < attributeOptionSize; i++) {
                        this.addAttributeOption();
                    }
                }
                this.attributeForm.patchValue(result, {emitEvent: false});
                // console.log(this.attributeForm);
            });
        } else {
            this.addAttributeOption();
        }
    }

    newAttributeOption(displayOrder = 0) {
        return this.fb.group({
            id: this.fb.control<string | undefined>(undefined),
            value: this.fb.control(''),
            displayOrder: this.fb.control(displayOrder),
        });
    }

    addAttributeOption() {
        const displayOrder = this.attributeOptions.length ?? 0;
        this.attributeOptions.push(this.newAttributeOption(displayOrder));
    }

    deleteAttributeOption(idx: number) {
        this.attributeOptions.removeAt(idx);
    }

    onDropped(event: CdkDragDrop<any [], any>) {
        const {previousIndex, currentIndex} = event;
        moveItemInArray(this.attributeOptions.value, previousIndex, currentIndex);
        this.attributeOptions.value.forEach((item, index) => item.displayOrder = index);
        this.attributeOptions.patchValue([...this.attributeOptions.value]);
    }


    onSubmit() {
        if (this.attributeForm.controls.id.value) {
            this.attributeService.updateAttribute(this.attributeForm.controls.id.value, this.attributeForm.getRawValue()).subscribe(() => this.dialogRef.close(true));
        } else {
            this.attributeService.createAttribute(this.attributeForm.getRawValue()).subscribe(() => this.dialogRef.close(true));
        }
    }

    createAttribute() {
        console.log(this.attributeForm.getRawValue());
        console.log(this.attributeForm.value);
        // this.attributeService.createAttribute(this.attributeForm.getRawValue()).subscribe()
    }

    createAttributeOption() {
    }


}
