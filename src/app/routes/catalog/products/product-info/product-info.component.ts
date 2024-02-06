import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ImageInputComponent} from '../../../../shared/components/image-input/image-input.component';
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
import {NumericDirective} from '../../../../shared/directives/numeric.directive';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {BehaviorSubject, map, Observable, startWith} from 'rxjs';
import {Category} from '../../categories/shared/category';
import {Image} from '../../../../shared/models/file';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {CategoryService} from '../../categories/shared/category.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Product} from '../shared/product';

@Component({
    selector: 'app-add-edit-product',
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
    filteredCategories!: Observable<Category []>;
    categoryCtrl = new FormControl('');
    @ViewChild('categoriesInput') categoriesInput!: ElementRef<HTMLInputElement>;
    categories: Category [] = [];
    categoriesSub = new BehaviorSubject<Category[]>(this.categories);
    allCategories: Category [] = [];
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
        this.categoriesSub.pipe(takeUntilDestroyed()).subscribe((categories) => {
            const categoryIds = categories.map(category => category.id!);
            this.productForm.controls.categoryIds.setValue(categoryIds, {emitEvent: false});
        });
    }

    private _filter(value: string): Category[] {
        const filterValue = value.toLowerCase();
        return this.allCategories.filter(category => category.name.toLowerCase().includes(filterValue));
    }

    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe(result => {
            this.allCategories = result
            this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
                startWith(null),
                map((categoryName: string | null) => (categoryName ? this._filter(categoryName) : this.allCategories.slice())),
            );
        });

        if (this.productId) {
            this.productService.getProduct(this.productId).subscribe(result => {

                this.productForm.patchValue(result);
                const {categoryIds = []} = result;
                this.categories = this.allCategories.filter(category => categoryIds.includes(category.id!));
            });
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {

        if (!this.categories.includes(event.option.value)) {
            this.categories.push(event.option.value);
            this.categoriesSub.next(this.categories);
        }
        this.categoriesInput.nativeElement.value = '';
        this.categoryCtrl.setValue(null);
    }

    addCategory(event: MatChipInputEvent) {
        // todo:解决已存在的分类问题
        /* const value = (event.value || '').trim();

         // Add our fruit
         if (value) {
             this.categoryService.createCategoryWithReturnCategoryItem({name: value}).subscribe(newCategory => {
                 this.categories.push(newCategory);
                 this.allCategories.push(newCategory);
             });
         }

         // Clear the input value
         event.chipInput!.clear();

         this.categoryCtrl.setValue(null);*/
    }

    removeCategory(category: Category) {
        const index = this.categories.indexOf(category);
        if (index >= 0) {
            this.categories.splice(index, 1);
            this.categoriesSub.next(this.categories);
            this.announcer.announce(`Removed ${this.allCategories.at(index)!.name}`);
        }
    }

    onSubmit() {
        console.log(this.productForm.getRawValue());
        const product: Product = this.productForm.getRawValue();
        this.productService.createProduct(product).subscribe(() => this.router.navigate(['/products']));
    }
}
