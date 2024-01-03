import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {CategoryListComponent} from '../category-list/category-list.component';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ImageInputComponent} from '../../../../shared/components/image-input/image-input.component';

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
        ImageInputComponent
    ],
    templateUrl: './category-details.component.html',
    styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent {
    categoryId!: string;
    categoryDetailsFrom: FormGroup<any> = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl('')
    });

    constructor(private route: ActivatedRoute) {
        this.categoryId = this.route.snapshot.paramMap.get('id')!;
    }

    onSubmit() {

    }
}
