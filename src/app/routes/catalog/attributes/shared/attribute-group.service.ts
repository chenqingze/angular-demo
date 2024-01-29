import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AttributeGroup} from './attribute';
import {Page} from '../../../../shared/models/page';

@Injectable({
    providedIn: 'root'
})
export class AttributeGroupService {

    readonly PATH = '/catalog/attribute-groups';

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

    findAttributeGroups(): Observable<Page<AttributeGroup>> {
        return this.httpClient.get<Page<AttributeGroup>>(`${this.PATH}`);
    }

    findAllGlobalAttributeGroups(): Observable<AttributeGroup[]> {
        return this.httpClient.get<AttributeGroup[]>(`${this.PATH}`);
    }

    findAllProductClassAttributeGroups(productClassId: string): Observable<AttributeGroup[]> {
        return this.httpClient.get<AttributeGroup[]>(`/catalog/product-classes/${productClassId}/attribute-groups`);
    }

}
