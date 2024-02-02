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
import {AttributeDisplayMode, AttributeType} from '../../../../attributes/shared/attribute';
import {MatInputModule} from '@angular/material/input';

interface AttributeOptionForm {
    id: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>
}

interface AttributeForm {
    id?: FormControl<string | undefined>,
    name: FormControl<string>,
    displayOrder: FormControl<number>
    attributeType: FormControl<AttributeType>;
    attributeDisplayMode: FormControl<AttributeDisplayMode | undefined>;
    productId: FormControl<string>;
    attributeOptions: FormArray<FormGroup<AttributeOptionForm>>;
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
        MatInputModule
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
            attributeType: this.fb.control<AttributeType>('SELECT'),
            attributeDisplayMode: this.fb.control<AttributeDisplayMode | undefined>(undefined),
            productId: this.fb.control(this.productId),
            attributeOptions: this.fb.array<FormGroup<AttributeOptionForm>>([]),
        });
        switch (type) {
            case 'SELECT':
                const attributeOption: FormGroup<AttributeOptionForm> = this.fb.group({
                    id: this.fb.control<string | undefined>(undefined),
                    name: this.fb.control<string>(''),
                    displayOrder: this.fb.control<number>(0),
                })
                attribute.controls.attributeDisplayMode.setValue('BLOCKS');
                attribute.controls.attributeOptions.push(attributeOption);
                break;
            case 'TEXT':
            case 'CHECKBOX':
            case 'HIDDEN':
            default:
                break;
        }
        this.attributes.push(attribute);
        console.log(this.attributes.value);
    }

    addAttributeOption() {

    }

    onSubmit() {

    }


}
