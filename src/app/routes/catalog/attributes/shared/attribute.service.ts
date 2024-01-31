import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attribute} from './attribute';

@Injectable({
    providedIn: 'root'
})
export class AttributeService {

    readonly PATH = '/catalog/attributes';

    constructor(private httpClient: HttpClient) {
    }

    createAttribute(attribute: Attribute): Observable<void> {
        return this.httpClient.post<void>(this.PATH, attribute);
    }

    deleteAttribute(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.PATH}/${id}`);
    }

    updateAttribute(id: string, attribute: Attribute): Observable<void> {
        return this.httpClient.put<void>(`${this.PATH}/${id}`, attribute);
    }

    getAttribute(id: string): Observable<Attribute> {
        return this.httpClient.get<Attribute>(`${this.PATH}/${id}`);
    }

    findAttributes(productClassId?: string): Observable<Attribute[]> {
        if (productClassId) {
            return this.findAllProductClassAttributes(productClassId);
        }
        return this.findAllGlobalAttributes();
    }

    private findAllGlobalAttributes(): Observable<Attribute[]> {
        return this.httpClient.get<Attribute[]>(`${this.PATH}`);
    }

    private findAllProductClassAttributes(productClassId: string): Observable<Attribute[]> {
        return this.httpClient.get<Attribute[]>(`/catalog/product-classes/${productClassId}/attributes`);
    }

}
