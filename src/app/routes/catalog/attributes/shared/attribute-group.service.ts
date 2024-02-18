import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AttributeGroup} from './attribute';

@Injectable({
    providedIn: 'root'
})
export class AttributeGroupService {

    readonly PATH = '/attribute-groups';

    constructor(private httpClient: HttpClient) {
    }

    createAttributeGroup(attributeGroup: AttributeGroup): Observable<void> {
        return this.httpClient.post<void>(this.PATH, attributeGroup);
    }

    deleteAttributeGroup(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.PATH}/${id}`);
    }

    updateAttributeGroup(id: string, attributeGroup: AttributeGroup): Observable<void> {
        return this.httpClient.put<void>(`${this.PATH}/${id}`, attributeGroup);
    }

    getAttributeGroup(id: string): Observable<AttributeGroup> {
        return this.httpClient.get<AttributeGroup>(`${this.PATH}/${id}`);
    }

    findAllAttributeGroups(categoryId?: string): Observable<AttributeGroup []> {
        if (categoryId) {
            return this.findAllCategoryAttributeGroups(categoryId);
        }
        return this.findAllGlobalAttributeGroups();
    }


    private findAllGlobalAttributeGroups(): Observable<AttributeGroup[]> {
        return this.httpClient.get<AttributeGroup[]>(`${this.PATH}`);
    }

    private findAllCategoryAttributeGroups(categoryId: string): Observable<AttributeGroup[]> {
        const params = new HttpParams().append('categoryId', categoryId);
        return this.httpClient.get<AttributeGroup[]>(`${this.PATH}`, {params});
    }

}
