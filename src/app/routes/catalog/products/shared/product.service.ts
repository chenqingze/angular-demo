import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from './product';
import {Observable} from 'rxjs';
import {Page} from '../../../../shared/models/page';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    readonly PATH = '/products';

    constructor(private httpClient: HttpClient) {
    }

    public createProduct(product: Product): Observable<void> {
        return this.httpClient.post<void>(this.PATH, product);
    }

    public updateProduct(productId: string, product: Product): Observable<void> {
        return this.httpClient.put<void>(`${this.PATH}/${productId}`, product);
    }

    public deleteProduct(productId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.PATH}/${productId}`);
    }

    getProducts(page: number, size: number): Observable<Page<Product>> {
        let params = new HttpParams().append('page', page).append('size', size);
        return this.httpClient.get<Page<Product>>(this.PATH, {params: params});
    }

    getProduct(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.PATH}/${id}`);
    }
}
