import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../../../../shared/models/file';
import {NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../shared/category.service';
import {Category} from '../../shared/category';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ImageInputComponent} from '../../../../../shared/components/image-input/image-input.component';
import {PageFooterComponent} from '../../../../../shared/components/page-footer/page-footer.component';
import {NgxWigModule} from 'ngx-wig';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-category-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ImageInputComponent,
        PageFooterComponent,
        NgxWigModule,
        MatButtonModule
    ],
    templateUrl: './category-info.component.html',
    styleUrl: './category-info.component.scss'
})
export class CategoryInfoComponent implements OnInit {
    @Input({required: true}) categoryId!: string;
    categoryDetailsFrom = this.fb.group({
        id: this.fb.control<string | undefined>(undefined),
        name: this.fb.control<string>(''),
        parentId: this.fb.control<string | undefined>(undefined),
        enabled: this.fb.control(true),
        icon: this.fb.control<Image[] | undefined>([]),
        description: this.fb.control<string>(''),
        displayOrder: this.fb.control<number>(0),
    })

    constructor(private fb: NonNullableFormBuilder, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService.getCategory(this.categoryId).subscribe(result => {
            console.log('getCategory');
            this.categoryDetailsFrom.setValue(result as any);
        });
    }

    onSubmit() {
        const {id, name, enabled, icon, description, displayOrder, parentId} = this.categoryDetailsFrom.getRawValue();
        const category: Category = {id, name, enabled, icon: icon && icon[0], description, displayOrder, parentId}
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
