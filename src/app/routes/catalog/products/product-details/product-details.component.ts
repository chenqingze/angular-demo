import {Component, Input, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ImageInputComponent} from '../../../../shared/components/image-input/image-input.component';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {NgxWigModule} from 'ngx-wig';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {NumericDirective} from '../../../../shared/directives/numeric.directive';
import {CategoryListComponent} from '../../categories/category-list/category-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {AddEditProductComponent} from '../add-edit-product/add-edit-product.component';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        CdkDrag,
        CdkDropList,
        FormsModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        ImageInputComponent,
        MatCardModule,
        MatRadioModule,
        NgxWigModule,
        MatSlideToggleModule,
        PageFooterComponent,
        MatChipsModule,
        MatAutocompleteModule,
        AsyncPipe,
        NumericDirective,
        CategoryListComponent,
        MatTabsModule,
        AddEditProductComponent
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    @Input('id') productId!: string;


    constructor() {
    }

    ngOnInit(): void {
    }

}
