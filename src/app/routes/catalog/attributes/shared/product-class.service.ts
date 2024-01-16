import {Injectable} from '@angular/core';
import {ProductClass} from './attribute';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductClassService {

    readonly PATH = '/catalog/product-classes';

    constructor(private httpClient: HttpClient) {
    }

    createProductClass(newProductClass: ProductClass): Observable<void> {
        return this.httpClient.post<void>(this.PATH, newProductClass);
    }

    findAllProductClasses(): Observable<ProductClass []> {
        return this.httpClient.get<ProductClass []>(this.PATH);
    }
}
