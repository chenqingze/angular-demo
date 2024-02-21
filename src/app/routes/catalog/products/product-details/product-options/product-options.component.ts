import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
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
import {Attribute, AttributeTypes} from '../../../attributes/shared/attribute';
import {map, Observable, startWith} from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {ProductOptionComponent} from './product-option/product-option.component';
import {ProductOptionForm} from '../../shared/product';
import {AttributeService} from '../../../attributes/shared/attribute.service';


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
    allAttributes: Attribute[] = [];
    filteredAttributes!: Observable<Attribute []>;
    existedAttributes: Attribute[] = [];
    productOptionsForm = this.fb.group({
        productOptions: this.fb.array<FormGroup<ProductOptionForm>>([])
    });

    get productOptions() {
        return this.productOptionsForm.controls.productOptions;
    }

    constructor(private fb: NonNullableFormBuilder, private attributeService: AttributeService) {

    }

    /* private _filter(value: string): Category[] {
         const filterValue = value.toString().toLowerCase();
         return this.allAttributes.filter(attribute => {
             category.name.toLowerCase().includes(filterValue)
         });
     }*/

    ngOnInit(): void {
        this.productOptions.valueChanges.pipe(
            startWith(null),
            map(value => {
                console.log(value);
                return value;
            }),
        );
        this.attributeService.findAttributes().subscribe();
    }

    onSubmit() {

    }

}
