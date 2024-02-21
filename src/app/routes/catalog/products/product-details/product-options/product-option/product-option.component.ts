import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {Attribute} from '../../../../attributes/shared/attribute';
import {ProductOptionForm} from '../../../shared/product';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-product-option',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe
    ],
    templateUrl: './product-option.component.html',
    styleUrl: './product-option.component.scss'
})
export class ProductOptionComponent {
    @Input({required: true}) formGroup!: FormGroup<ProductOptionForm>;
    @Input({required: true}) filteredAttributes!: Observable<Attribute []>;
}
