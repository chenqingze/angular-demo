import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attribute} from './attribute';
import {Page} from '../../../../shared/models/page';

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

    findGlobalAttributes(): Observable<Page<Attribute>> {
        return this.httpClient.get<Page<Attribute>>(`${this.PATH}`);
    }

    findAllGlobalAttributes(): Observable<Attribute[]> {
        return this.httpClient.get<Attribute[]>(`${this.PATH}`);
    }

    findAllProductClassAttributes(productClassId: string): Observable<Attribute[]> {
        return this.httpClient.get<Attribute[]>(`/catalog/${productClassId}/attributes`);
    }

}
