import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Attribute} from '../../../../attributes/shared/attribute';
import {AttributeService} from '../../../../attributes/shared/attribute.service';
import {FormControl} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProductOptionService {
    private _allAttributes: Attribute[] = [];
    private _allAttributes$ = new BehaviorSubject<Attribute[]>([]);
    readonly allAttributes$ = this._allAttributes$.asObservable();

    private _unSelectedAttributes: Attribute[] = [];
    private _unSelectedAttributes$ = new BehaviorSubject<Attribute[]>([]);
    readonly unSelectedAttributes$ = this._unSelectedAttributes$.asObservable();

    constructor(private attributeService: AttributeService) {
    }

    loadAllAttributes(callback: Function) {
        this.attributeService.findAttributes().subscribe(result => {
            this._allAttributes = result;
            this._allAttributes$.next(Object.assign([], this._allAttributes));
            if (callback) {
                callback();
            }
        });
    }

    createAttribute(attribute: Attribute, attributeId?: FormControl<string | undefined>) {
        this.attributeService.createAttribute(attribute).subscribe(result => {
            this._allAttributes.push(result);
            this._allAttributes$.next(Object.assign([], this._allAttributes));
            if (attributeId) {
                attributeId.setValue(result.id);
            }
        });
    }

    filterSelectedAttribute(attributeIds: string []) {
        this._unSelectedAttributes = this._allAttributes.filter(attribute => !attributeIds.includes(attribute.id!));
        this._unSelectedAttributes$.next(Object.assign([], this._unSelectedAttributes));
    }
}
