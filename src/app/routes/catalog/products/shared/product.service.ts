import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    readonly PATH = '/catalog/products';

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
}
