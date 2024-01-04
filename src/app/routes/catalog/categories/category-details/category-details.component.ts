import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
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
    categoryId!: string;
    categoryDetailsFrom: FormGroup<any> = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        parentId: new FormControl(''),
        enabled: new FormControl(true),
        icon: new FormControl([]),
        description: new FormControl(''),
    });

    constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
        this.categoryId = this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
        this.categoryService.getCategory(this.categoryId).subscribe(result => {
            this.categoryDetailsFrom.setValue(result);
        });
    }

    onSubmit() {
        const category = {...this.categoryDetailsFrom.getRawValue()};
        console.log(category)
        if (category.icon instanceof Array) {
            category.icon = category.icon.at(0);
        }
        console.log(category);

        if (this.categoryId) {
            this.categoryService.updateCategory(this.categoryId, category).subscribe();
        } else {
            this.categoryService.createCategory(category).subscribe();
        }
    }
}
