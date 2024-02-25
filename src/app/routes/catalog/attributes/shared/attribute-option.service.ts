import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AttributeOption} from './attribute';

@Injectable({
    providedIn: 'root'
})
export class AttributeOptionService {

    readonly PATH = '/attribute-options';

    constructor(private httpClient: HttpClient) {
    }

    createAttributeOption(attributeOption: AttributeOption): Observable<AttributeOption> {
        return this.httpClient.post<AttributeOption>(this.PATH, attributeOption);
    }

    deleteAttributeOption(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.PATH}/${id}`);
    }

    updateAttributeOption(id: string, attributeOption: AttributeOption): Observable<void> {
        return this.httpClient.put<void>(`${this.PATH}/${id}`, attributeOption);
    }

    getAttributeOption(id: string): Observable<AttributeOption> {
        return this.httpClient.get<AttributeOption>(`${this.PATH}/${id}`);
    }

    findAttributeOptions(attributeId: string): Observable<AttributeOption[]> {
        const params = new HttpParams().append("attributeId", attributeId);
        return this.httpClient.get<AttributeOption[]>(`${this.PATH}`, {params});
    }

}
