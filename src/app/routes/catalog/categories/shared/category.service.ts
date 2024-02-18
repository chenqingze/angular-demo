import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    readonly PATH = '/categories';

    constructor(private httpClient: HttpClient) {
    }

    createCategoryWithReturnCategoryItem(category: Category): Observable<Category> {
        return this.httpClient.post<Category>(`${this.PATH}/return`, category);
    }

    createCategory(category: Category): Observable<void> {
        return this.httpClient.post<void>(this.PATH, category);
    }

    deleteCategory(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.PATH}/${id}`);
    }

    updateCategory(id: string, category: Category): Observable<void> {
        return this.httpClient.put<void>(`${this.PATH}/${id}`, category);
    }

    getCategory(id: string): Observable<Category> {
        return this.httpClient.get<Category>(`${this.PATH}/${id}`);
    }

    getAllCategories(): Observable<Category []> {
        return this.httpClient.get<Category []>(this.PATH);
    }

    getAllSubcategories(parentCategoryId?: string): Observable<Category []> {
        const path = parentCategoryId ? `${this.PATH}/${parentCategoryId}/subcategories` : `${this.PATH}/subcategories`
        return this.httpClient.get<Category []>(path);
    }

}
