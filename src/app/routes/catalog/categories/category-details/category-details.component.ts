import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CategoryListComponent} from '../category-list/category-list.component';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ImageInputComponent} from '../../../../shared/components/image-input/image-input.component';
import {CategoryService} from '../shared/category.service';
import {PageFooterComponent} from '../../../../shared/components/page-footer/page-footer.component';
import {NgxWigModule} from 'ngx-wig';
import {MatSelectModule} from '@angular/material/select';
import {Image} from '../../../../shared/models/file';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';

interface CategoryDetailForm {
    id: FormControl<string | null>,
    name: FormControl<string>,
    parentId: FormControl<string | null>,
    enabled: FormControl<boolean>,
    icon: FormControl<Image | null>,
    description: FormControl<string | null>,
}

@Component({
    selector: 'app-category-details',
    standalone: true,
    imports: [
        MatTabsModule,
        RouterLink,
        RouterOutlet,
        CategoryListComponent,
        MatCardModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ImageInputComponent,
        PageFooterComponent,
        NgxWigModule,
        MatSelectModule,
    ],
    templateUrl: './category-details.component.html',
    styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {
    @ViewChild('tabGroup') tabGroup!: MatTabGroup;
    categoryId!: string;
    categoryDetailsFrom = new FormGroup<CategoryDetailForm>({
        id: new FormControl(),
        name: new FormControl('', {nonNullable: true}),
        parentId: new FormControl(),
        enabled: new FormControl(true, {nonNullable: true}),
        icon: new FormControl(),
        description: new FormControl(),
    });

    constructor(private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) {
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed(),
        ).subscribe(() => {
            this.categoryId = this.route.snapshot.paramMap.get('id')!;
            this.categoryService.getCategory(this.categoryId).subscribe(result => {
                console.log('getCategory');
                this.categoryDetailsFrom.setValue(result);
                this.tabGroup.selectedIndex = 0;
            });
        });

    }

    ngOnInit(): void {
    }

    onSubmit() {
        const category = {...this.categoryDetailsFrom.getRawValue()};
        if (category.icon && (category.icon instanceof Array)) {
            category.icon = category.icon.at(0) || null;
        }
        if (this.categoryId) {
            this.categoryService.updateCategory(this.categoryId, category).subscribe(() => this.reload());
        } else {
            this.categoryService.createCategory(category).subscribe(() => this.reload());
        }
    }

    reload() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('', {skipLocationChange: true}).then(() => this.router.navigate([currentUrl]));
    }

}
