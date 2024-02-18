import {Component, Input, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {
    FormArray,
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {PageFooterComponent} from '../../../../../../shared/components/page-footer/page-footer.component';
import {MatMenuModule} from '@angular/material/menu';
import {
    AttributeDisplayMode,
    AttributeType,
    PriceModifierType,
    WeightModifierType
} from '../../../../attributes/shared/attribute';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {NgClass} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

interface AttributeOptionForm {
    id: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>,
    // addToNew: FormControl<boolean>
}

interface AttributeValueForm {
    id: FormControl<string | undefined>,
    attributeId: FormControl<string | undefined>,
    productId: FormControl<string | undefined>,
}

interface AttributeValueTextForm extends AttributeValueForm {
    value: FormControl<string>,
    editable: FormControl<boolean>,
}

interface AttributeMultiValueForm extends AttributeValueForm {
    isDefault: FormControl<boolean>,
    priceModifierType: FormControl<PriceModifierType | undefined>,
    priceAdjustment: FormControl<string | undefined>,
    weightModifierType: FormControl<WeightModifierType | undefined>,
    weightAdjustment: FormControl<string | undefined>,
}

interface AttributeValueSelectForm extends AttributeMultiValueForm {
    displayOrder: FormControl<number>,
    attributeOption: FormGroup<AttributeOptionForm>;
}

interface AttributeValueCheckboxForm extends AttributeMultiValueForm {
    value: FormControl<boolean>;
}

interface AttributeForm {
    id: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>
    attributeType: FormControl<AttributeType>;
    attributeDisplayMode: FormControl<AttributeDisplayMode | undefined>;
    // addToNew: FormControl<AddToNewType | undefined>;
    productId: FormControl<string>;
    attributeValueSelects?: FormArray<FormGroup<AttributeValueSelectForm>>;
    attributeValueCheckboxes?: FormArray<FormGroup<AttributeValueCheckboxForm>>;
    attributeValueText?: FormGroup<AttributeValueTextForm>;
}

@Component({
    selector: 'app-product-specific-attribute',
    standalone: true,
    imports: [
        CdkDrag,
        CdkDropList,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        PageFooterComponent,
        ReactiveFormsModule,
        MatMenuModule,
        MatInputModule,
        MatCheckboxModule,
        NgClass,
        MatSelectModule
    ],
    templateUrl: './product-specific-attribute.component.html',
    styleUrl: './product-specific-attribute.component.scss'
})
export class ProductSpecificAttributeComponent implements OnInit {
    @Input({required: true}) productId!: string;
    productSpecificAttributeForm = this.fb.group({
        attributes: this.fb.array<FormGroup<AttributeForm>>([]),
    })

    get attributes() {
        return this.productSpecificAttributeForm.controls.attributes;
    }

    constructor(private fb: NonNullableFormBuilder) {
    }

    ngOnInit(): void {
    }

    addAttribute(type: AttributeType) {
        const attribute = this.fb.group<AttributeForm>({
            id: this.fb.control<string | undefined>(undefined),
            name: this.fb.control(''),
            displayOrder: this.fb.control(0),
            attributeType: this.fb.control<AttributeType>(type),
            attributeDisplayMode: this.fb.control<AttributeDisplayMode | undefined>(undefined),
            productId: this.fb.control(this.productId),
        });
        switch (attribute.controls.attributeType.value) {
            case 'SELECT':
                attribute.controls.attributeDisplayMode.setValue('BLOCKS');
                attribute.addControl('attributeValueSelects', this.fb.array<FormGroup<AttributeValueSelectForm>>([]));
                this.addAttributeValueSelect(attribute);
                break;
            case 'CHECKBOX':
                attribute.addControl('attributeValueCheckboxes', this.fb.array<FormGroup<AttributeValueCheckboxForm>>([], Validators.maxLength(2)));
                this.addAttributeValueCheckbox(attribute);
                break;
            case 'TEXT':
                attribute.addControl('attributeValueText', this.fb.group<AttributeValueTextForm>({
                    id: this.fb.control<string | undefined>(undefined),
                    attributeId: this.fb.control<string | undefined>(undefined),
                    productId: this.fb.control<string | undefined>(undefined),
                    value: this.fb.control(''),
                    editable: this.fb.control(false),
                }));
                break;
            case 'HIDDEN':
                // todo:
                break;
            default:
                break;
        }
        this.attributes.push(attribute);
    }


    deleteAttribute(attributeIdx: number) {
        this.attributes.removeAt(attributeIdx);
    }

    //////////////////////////
    // AttributeValueSelect //
    //////////////////////////
    addAttributeValueSelect(attribute: FormGroup<AttributeForm>) {
        let attributeValueSelects = attribute.controls.attributeValueSelects;
        if (!attributeValueSelects) {
            attributeValueSelects = this.fb.array<FormGroup<AttributeValueSelectForm>>([]);
            attribute.addControl('attributeValueSelects', attributeValueSelects);
        }
        // values 长度大于0时,当前attributeOption有数据的时候才可以增加新值
        if (attributeValueSelects.length > 0) {
            const currentValue = attributeValueSelects.at(attributeValueSelects.length - 1);
            if (!currentValue.value.attributeOption?.name) {
                return;
            }
        }
        const newAttributeValue: FormGroup<AttributeValueSelectForm> = this.fb.group({
            id: this.fb.control<string | undefined>(undefined),
            attributeId: this.fb.control<string | undefined>(attribute.controls.id.value),
            productId: this.fb.control<string | undefined>(this.productId),
            isDefault: this.fb.control<boolean>(false),
            priceModifierType: this.fb.control<PriceModifierType | undefined>(undefined),
            priceAdjustment: this.fb.control<string | undefined>(undefined),
            weightModifierType: this.fb.control<WeightModifierType | undefined>(undefined),
            weightAdjustment: this.fb.control<string | undefined>(undefined),
            displayOrder: this.fb.control<number>(0),
            attributeOption: this.fb.group<AttributeOptionForm>({
                id: this.fb.control<string | undefined>(undefined),
                name: this.fb.control<string>(''),
                displayOrder: this.fb.control<number>(0),
            })
        });
        attributeValueSelects.push(newAttributeValue);
    }

    deleteAttributeValueSelect(attributeIdx: number, attributeValueIdx: number) {
        this.attributes.at(attributeIdx).controls.attributeValueSelects?.removeAt(attributeValueIdx);
    }

    onAttributeValueSelectMultiValueChange(event: MatCheckboxChange, attribute: FormGroup<AttributeForm>) {
        if (event.checked) {
            this.addAttributeValueSelect(attribute);
        } else {
            const attributeValueSelects = attribute.controls.attributeValueSelects;
            if (attributeValueSelects) {
                const firstAttributeValueSelect = attributeValueSelects.at(0);
                attributeValueSelects.clear();
                firstAttributeValueSelect && attributeValueSelects.push(firstAttributeValueSelect);
            }
        }
    }

    ////////////////////////////
    // AttributeValueCheckbox //
    ////////////////////////////
    addAttributeValueCheckbox(attribute: FormGroup<AttributeForm>) {
        let attributeValueCheckboxes = attribute.controls.attributeValueCheckboxes;
        if (attributeValueCheckboxes && attributeValueCheckboxes?.length >= 2) {
            return;
        }
        if (!attributeValueCheckboxes) {
            attributeValueCheckboxes = this.fb.array<FormGroup<AttributeValueCheckboxForm>>([]);
            attribute.addControl('attributeValueCheckboxes', attributeValueCheckboxes);
        }
        const currentValue = attributeValueCheckboxes.at(0)?.controls?.value;
        const newAttributeValue: FormGroup<AttributeValueCheckboxForm> = this.fb.group({
            id: this.fb.control<string | undefined>(undefined),
            attributeId: this.fb.control<string | undefined>(attribute.controls.id.value),
            productId: this.fb.control<string | undefined>(this.productId),
            isDefault: this.fb.control<boolean>(false),
            priceModifierType: this.fb.control<PriceModifierType | undefined>(undefined),
            priceAdjustment: this.fb.control<string | undefined>(undefined),
            weightModifierType: this.fb.control<WeightModifierType | undefined>(undefined),
            weightAdjustment: this.fb.control<string | undefined>(undefined),
            value: this.fb.control(!currentValue)
        });

        attributeValueCheckboxes.push(newAttributeValue);
    }

    onAttributeValueCheckboxMultiValueChange(event: MatCheckboxChange, attribute: FormGroup<AttributeForm>) {
        if (event.checked) {
            this.addAttributeValueCheckbox(attribute);
        } else {
            const attributeValueCheckboxes = attribute.controls.attributeValueCheckboxes;
            if (attributeValueCheckboxes) {
                const firstAttributeValueCheckbox = attributeValueCheckboxes.at(0);
                attributeValueCheckboxes.clear();
                firstAttributeValueCheckbox && attributeValueCheckboxes.push(firstAttributeValueCheckbox);
            }
        }
    }

    ////////////////////////
    // AttributeValueText //
    ////////////////////////
    onEditableChange(event: MatCheckboxChange, attribute: FormGroup<AttributeForm>) {
        if (event.checked) {
            attribute.controls.attributeValueText?.patchValue({value: '', editable: event.checked});
        }
    }

    onSubmit() {
        console.log(this.productSpecificAttributeForm);
    }


}
