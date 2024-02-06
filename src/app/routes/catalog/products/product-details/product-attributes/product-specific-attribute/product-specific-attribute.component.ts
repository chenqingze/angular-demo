import {Component, Input, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {
    FormArray,
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {PageFooterComponent} from '../../../../../../shared/components/page-footer/page-footer.component';
import {MatMenuModule} from '@angular/material/menu';
import {AddToNewType, Attribute, AttributeDisplayMode, AttributeType} from '../../../../attributes/shared/attribute';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgClass} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {Product} from '../../../shared/product';

interface AttributeOptionForm {
    id: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>,
    addToNew: FormControl<boolean>
}

interface AttributeForm {
    id: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>
    attributeType: FormControl<AttributeType>;
    attributeDisplayMode: FormControl<AttributeDisplayMode | undefined>;
    addToNew: FormControl<AddToNewType | undefined>;
    productId: FormControl<string>;
    attributeOptions?: FormArray<FormGroup<AttributeOptionForm>>;
}

interface AttributeValueForm {
    id?: string;
    attribute: Attribute;
    product?: Product;
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
    attributeValueSelects = [];
    attributeValueCheckboxes = [];
    attributeValueTexts = [];
    attributeValueHiddens = [];
    productSpecificAttributeForm = this.fb.group({
        attributes: this.fb.array<FormGroup<AttributeForm>>([]),
    })

    get attributes() {
        return this.productSpecificAttributeForm.controls.attributes;
    }

    constructor(private fb: NonNullableFormBuilder) {
    }

    ngOnInit(): void {
        // this.attributeValueSelects
        // this.attributeValueCheckboxes
        // this.attributeValueTexts
        // this.attributeValueHiddens
    }

    addAttribute(type: AttributeType) {
        const attribute = this.fb.group<AttributeForm>({
            id: this.fb.control<string | undefined>(undefined),
            name: this.fb.control(''),
            displayOrder: this.fb.control(0),
            attributeType: this.fb.control<AttributeType>(type),
            attributeDisplayMode: this.fb.control<AttributeDisplayMode | undefined>(undefined),
            addToNew: this.fb.control(undefined),
            productId: this.fb.control(this.productId),
        });
        switch (attribute.controls.attributeType.value) {
            case 'SELECT':
                this.addAttributeOption(attribute);
                break;
            case 'TEXT':
                break;
            case 'CHECKBOX':
            case 'HIDDEN':
            default:
                break;
        }
        this.attributes.push(attribute);
    }

    deleteAttribute(attributeIdx: number) {
        this.attributes.removeAt(attributeIdx);
    }

    addAttributeOption(attribute: FormGroup<AttributeForm>) {
        const attributeOption: FormGroup<AttributeOptionForm> = this.fb.group({
            id: this.fb.control<string | undefined>(undefined),
            name: this.fb.control<string>(''),
            displayOrder: this.fb.control<number>(0),
            addToNew: this.fb.control(false)
        })
        attribute.controls.attributeDisplayMode.setValue('BLOCKS');
        if (!attribute.controls.attributeOptions) {
            attribute.addControl('attributeOptions', this.fb.array<FormGroup<AttributeOptionForm>>([]))
        }
        attribute.controls.attributeOptions?.push(attributeOption);
    }

    deleteAttributeOption(attributeIdx: number, attributeOptionIdx: number) {
        this.attributes.at(attributeIdx).controls.attributeOptions?.removeAt(attributeOptionIdx);
    }

    onSubmit() {

    }


}
