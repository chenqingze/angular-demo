import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attribute} from './attribute';

@Injectable({
    providedIn: 'root'
})
export class AttributeService {

    readonly PATH = '/attributes';

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

    findAttributes(categoryId?: string): Observable<Attribute[]> {
        if (categoryId) {
            return this.findAllCategoryAttributes(categoryId);
        }
        return this.findAllGlobalAttributes();
    }

    private findAllGlobalAttributes(): Observable<Attribute[]> {
        return this.httpClient.get<Attribute[]>(`${this.PATH}`);
    }

    private findAllCategoryAttributes(categoryId: string): Observable<Attribute[]> {
        const params = new HttpParams().append("categoryId", categoryId);
        return this.httpClient.get<Attribute[]>(`${this.PATH}`, {params});
    }

}
