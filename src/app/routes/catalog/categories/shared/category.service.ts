import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category, CategoryForm} from './category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    readonly PATH = '/catalog/categories';

    constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    }

    createCategory(category: Category): Observable<void> {
        return this.httpClient.post<void>(this.PATH, category);
    }

    updateCategory(id: string, category: Category): Observable<void> {
        return this.httpClient.put<void>(`${this.PATH}/${id}`, category);
    }

    deleteCategory(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.PATH}/${id}`);
    }

    getCategory(id: string): Observable<Category> {
        return this.httpClient.get<Category>(`${this.PATH}/${id}`);
    }

    getAllCategories(): Observable<Category []> {
        return this.httpClient.get<Category []>(this.PATH);
    }

    getAllSubcategories(parentCategoryId?: string): Observable<Category []> {
        const path = parentCategoryId ? `${this.PATH}/${parentCategoryId}/subcategories` : `${this.PATH}/root/subcategories`
        return this.httpClient.get<Category []>(path);
    }

    buildCategoryForm = (isNew = true): FormGroup<CategoryForm> => {
        return this.fb.group<CategoryForm>({
            id: this.fb.nonNullable.control({value: '', disabled: isNew}),
            name: this.fb.nonNullable.control('', {validators: Validators.required}),
            description: this.fb.nonNullable.control(''),
            parentId: this.fb.nonNullable.control('1'),
            displayOrder: this.fb.nonNullable.control(0),
            assetId: this.fb.nonNullable.control(undefined)
        });
    }
}
