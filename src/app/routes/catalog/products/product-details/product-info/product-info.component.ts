import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ImageInputComponent} from '../../../../../shared/components/image-input/image-input.component';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxWigModule} from 'ngx-wig';
import {NumericDirective} from '../../../../../shared/directives/numeric.directive';
import {PageFooterComponent} from '../../../../../shared/components/page-footer/page-footer.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Category} from '../../../categories/shared/category';
import {Image} from '../../../../../shared/models/file';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Router} from '@angular/router';
import {ProductService} from '../../shared/product.service';
import {CategoryService} from '../../../categories/shared/category.service';
import {Product} from '../../shared/product';

@Component({
    selector: 'app-product-info',
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
        ReactiveFormsModule
    ],
    templateUrl: './product-info.component.html',
    styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {
    @Input() productId: string | undefined;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    allCategories: Category [] = [];
    filteredCategories: Category [] = [];
    selectedCategories: Category [] = [];
    categoryCtrl = new FormControl('');
    @ViewChild('categoriesInput') categoriesInput!: ElementRef<HTMLInputElement>;

    productForm = this.fb.group({
        id: this.fb.control<string | undefined>(undefined),
        name: this.fb.control<string>('', Validators.required),
        sku: this.fb.control<string | undefined>(undefined),
        images: this.fb.control<Image [] | undefined>([]),
        categoryIds: this.fb.control<string []>([]),
        description: this.fb.control<string | undefined>(''),
        fullDescription: this.fb.control<string | undefined>(''),
        enabled: this.fb.control(true),
        price: this.fb.control<string | undefined>('0.00'),
        marketPrice: this.fb.control<string | undefined>(undefined),
        constPrice: this.fb.control<string | undefined>(undefined)
    });


    constructor(private fb: NonNullableFormBuilder, private announcer: LiveAnnouncer, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    }

    private _categoriesFilter(categoryNam: string): Category[] {
        const filterValue = categoryNam.toString().toLowerCase();
        return this.allCategories.filter(category => {
            category.name.toLowerCase().includes(filterValue)
        });
    }

    ngOnInit(): void {
        this.categoryService.findAllCategories().subscribe(result => {
            this.allCategories = result;
            if (this.productId) {
                this.productService.getProduct(this.productId).subscribe(result => {
                    this.productForm.patchValue(result);
                    const {categoryIds = []} = result;
                    this.selectedCategories = this.allCategories.filter(category => categoryIds.includes(category.id!));
                    this.filteredCategories = this.allCategories.filter(category => !categoryIds.includes(category.id!))
                });
            }

        });
        this.categoryCtrl.valueChanges.subscribe(categoryName => this.filteredCategories = !!categoryName ? this._categoriesFilter(categoryName) : this.allCategories.slice());

    }

    /**
     * 添加并分配新分类
     * @param event
     */
    addCategory(event: MatChipInputEvent) {
        // todo:解决已存在的分类问题
        /* const value = (event.value || '').trim();

         // Add our fruit
         if (value) {
             this.categoryService.createCategoryWithReturnCategoryItem({name: value}).subscribe(newCategory => {
                 this.selectedCategories.push(newCategory);
                 this.allCategories.push(newCategory);
             });
         }

         // Clear the input value
         event.chipInput!.clear();

         this.categoryCtrl.setValue(null);*/
    }

    selectedCategory(event: MatAutocompleteSelectedEvent): void {

        if (!this.selectedCategories.includes(event.option.value)) {
            this.selectedCategories.push(event.option.value);
            this.updateCategoryIdsControl();
        }
        this.categoriesInput.nativeElement.value = '';
        this.categoryCtrl.setValue(null);
        this.productForm.markAsDirty();
    }


    removeCategory(category: Category) {
        const index = this.selectedCategories.indexOf(category);
        if (index >= 0) {
            this.selectedCategories.splice(index, 1);
            this.updateCategoryIdsControl();
            this.announcer.announce(`Removed ${this.allCategories.at(index)!.name}`);
        }
        this.productForm.markAsDirty();
    }

    updateCategoryIdsControl() {
        const categoryIds = this.selectedCategories.map(category => category.id!);
        this.productForm.controls.categoryIds.setValue(categoryIds, {emitEvent: false});
    }

    onSubmit() {
        const product: Product = this.productForm.getRawValue();
        if (this.productId) {
            this.productService.updateProduct(this.productId, product).subscribe(() => this.router.navigate(['/products']));
        } else {
            this.productService.createProduct(product).subscribe(() => this.router.navigate(['/products']));
        }
    }
}
