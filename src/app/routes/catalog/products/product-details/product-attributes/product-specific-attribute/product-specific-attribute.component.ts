import {Component, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormArray} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {PageFooterComponent} from '../../../../../../shared/components/page-footer/page-footer.component';
import {MatMenuModule} from '@angular/material/menu';
import {AttributeType} from '../../../../attributes/shared/attribute';
import {MatInputModule} from '@angular/material/input';

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
    protected readonly AttributeType = AttributeType;

    productSpecificAttributeForm = this.fb.group({
        attributes: new UntypedFormArray([]),
    })

    get attributes() {
        return this.productSpecificAttributeForm.controls.attributes;
    }

    addAttribute(type: AttributeType) {
        switch (type) {
            case AttributeType.SELECT:
                const attributeOption = this.fb.group({
                    name: this.fb.group('')
                })
                const attribute = this.fb.group({
                    name: this.fb.group(''),
                    isVisible: this.fb.control(false),
                    attributeOptions: this.fb.array([attributeOption])
                });
                this.attributes.push(attribute);
                break;
            case AttributeType.TEXTAREA:
                break;
            case AttributeType.CHECKBOX:
                break;
            case AttributeType.HIDDEN:
                break;

        }
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {

    }

    onSubmit() {

    }


}
