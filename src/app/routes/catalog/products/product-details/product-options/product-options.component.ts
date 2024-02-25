import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormArray, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ImageInputComponent} from '../../../../../shared/components/image-input/image-input.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxWigModule} from 'ngx-wig';
import {NumericDirective} from '../../../../../shared/directives/numeric.directive';
import {PageFooterComponent} from '../../../../../shared/components/page-footer/page-footer.component';
import {AttributeTypes} from '../../../attributes/shared/attribute';
import {MatSelectModule} from '@angular/material/select';
import {ProductOptionComponent} from './product-option/product-option.component';
import {ProductOptionForm} from './shared/product-option';
import {ProductOptionService} from './shared/product-option.service';


@Component({
    selector: 'app-product-options',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ImageInputComponent,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSlideToggleModule,
        NgxWigModule,
        NumericDirective,
        PageFooterComponent,
        ReactiveFormsModule,
        MatSelectModule,
        ProductOptionComponent
    ],
    templateUrl: './product-options.component.html',
    styleUrl: './product-options.component.scss'
})
export class ProductOptionsComponent implements OnInit {

    protected readonly AttributeTypes = AttributeTypes;

    @Input({required: true}) productId!: string;

    productOptionsForm = this.fb.group({
        productOptions: this.fb.array<FormGroup<ProductOptionForm>>([])
    });


    constructor(private fb: NonNullableFormBuilder, private productOptionService: ProductOptionService) {
    }


    get productOptions(): FormArray<FormGroup<ProductOptionForm>> {
        return this.productOptionsForm.controls.productOptions;
    }

    get attributeIds() {
        return this.productOptions.value.map(value => value.attributeId!);
    }

    ngOnInit(): void {
        this.productOptions.valueChanges.subscribe(value => {
            this.productOptionService.filterSelectedAttribute(this.attributeIds);
        });
        this.productOptionService.loadAllAttributes(() => this.addProductOption());
    }

    addProductOption() {
        const newProductOptions = this.fb.group<ProductOptionForm>({
            attributeId: this.fb.control(undefined),
            attributeOptionIds: this.fb.control(undefined),
            displayOrder: this.fb.control(0),
            productId: this.fb.control(this.productId)
        });
        this.productOptions.push(newProductOptions);
    }

    removeProductOption(index: number) {
        this.productOptions.removeAt(index);
    }

    onSubmit() {
        console.log(this.productOptionsForm.getRawValue());
    }


}
