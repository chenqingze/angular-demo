import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Attribute, AttributeOption} from '../../../../attributes/shared/attribute';
import {AsyncPipe} from '@angular/common';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ProductOptionForm} from '../shared/product-option';
import {ProductOptionService} from '../shared/product-option.service';
import {AttributeOptionService} from '../../../../attributes/shared/attribute-option.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
    selector: 'app-product-option',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        AsyncPipe,
        MatChipsModule,
        MatIconModule
    ],
    templateUrl: './product-option.component.html',
    styleUrl: './product-option.component.scss'
})
export class ProductOptionComponent implements OnInit {

    @Input({required: true}) formGroup!: FormGroup<ProductOptionForm>;
    allAttributes: Attribute [] = [];
    allSelectableAttributes: Attribute [] = [];
    filteredAttributes: Attribute [] = [];

    attributeCtrl = new FormControl('');
    @ViewChild('attributeInput') attributeInput!: ElementRef<HTMLInputElement>;

    separatorKeysCodes: number[] = [ENTER, COMMA];
    allAttributeOptions: AttributeOption [] = [];
    filteredAttributeOptions: AttributeOption [] = [];
    selectedAttributeOptions: AttributeOption [] = [];
    attributeOptionsCtrl = new FormControl('');
    @ViewChild('attributeOptionInput') attributeOptionInput!: ElementRef<HTMLInputElement>;


    constructor(private announcer: LiveAnnouncer, private productOptionService: ProductOptionService, private attributeOptionService: AttributeOptionService) {
    }

    get attributeId() {
        return this.formGroup.controls.attributeId;
    }

    get attributeOptionIds() {
        return this.formGroup.controls.attributeOptionIds;
    }

    ngOnInit(): void {
        this.productOptionService.allAttributes$.subscribe(value => {
            this.allAttributes = value;
        });
        this.productOptionService.unSelectedAttributes$.subscribe(value => {
            this.allSelectableAttributes = value;
            if (this.attributeId.value) {
                const selectedAttribute = this.allAttributes.find(attribute => attribute.id === this.attributeId.value);
                if (selectedAttribute) {
                    this.attributeCtrl.setValue(selectedAttribute.name);
                    this.allSelectableAttributes = [selectedAttribute, ...value]
                }
            }
            this.filteredAttributes = this.allSelectableAttributes;
        });
        this.attributeId.valueChanges.subscribe(attributeId => {
            if (attributeId) {
                this.loadAttributeOptionByAttribute(attributeId);
            }

        });
        this.attributeOptionsCtrl.valueChanges.subscribe(attributeOptionValue => {
            this.filteredAttributeOptions = !!attributeOptionValue ? this._attributeOptionsFilter(attributeOptionValue) : this.allAttributeOptions
        });
    }

    // todo:切换attribute 或者attribute 没有值时，重置attributeOption
    attributeFilter() {
        const filterValue = this.attributeInput.nativeElement.value.toLowerCase();
        this.filteredAttributes = this.allSelectableAttributes.filter(attribute => attribute.name.toLowerCase().includes(filterValue));
    }

    isNewAttribute(attributeName: string) {
        return this.allAttributes.findIndex(attribute => attribute.name === attributeName) === -1;
    }

    selectedAttribute(event: MatAutocompleteSelectedEvent) {
        const {value} = event.option
        if (this.isNewAttribute(value)) {
            const newAttribute = {
                name: value,
                attributeType: 'LIST_OF_VALUES',
                attributeDataType: 'STRING'
            } as Attribute;
            this.productOptionService.createAttribute(newAttribute, this.attributeId);
        } else {
            const selectedAttributeId = this.allSelectableAttributes.find(attribute => attribute.name === value)!.id;
            this.attributeId.setValue(selectedAttributeId);
        }

    }


    loadAttributeOptionByAttribute(attributeId: string) {
        this.attributeOptionService.findAttributeOptions(attributeId)
            .subscribe(result => {
                this.allAttributeOptions = result;
                this.filteredAttributeOptions = this.allAttributeOptions.filter(attributeOption => !this.attributeOptionIds.value?.includes(attributeOption.id!));
            });
    }

    isNewAttributeOption(value: string) {
        return this.allAttributeOptions.findIndex(attributeOption => attributeOption.value === value) === -1;
    }

    private _attributeOptionsFilter(attributeOptionValue: string): AttributeOption[] {
        const filterValue = attributeOptionValue.toString().toLowerCase();
        return this.allAttributeOptions.filter(attributeOption => {
            attributeOption.value.toLowerCase().includes(filterValue)
        });
    }

    addAttributeOption(event: MatChipInputEvent) {
        const value = (event.value || '').trim();
        if (value) {
            const attributeOption = {value, attributeId: this.attributeId.value} as AttributeOption;
            this.attributeOptionService.createAttributeOption(attributeOption).subscribe(newAttributeOption => {
                this.allAttributeOptions.push(newAttributeOption);
                this.selectedAttributeOptions.push(newAttributeOption);
            });
        }

        // Clear the input value
        event.chipInput!.clear();

        this.attributeOptionsCtrl.setValue(null);
    }


    selectedAttributeOption(event: MatAutocompleteSelectedEvent) {
        console.log('触发了吗？');
        if (!this.selectedAttributeOptions.includes(event.option.value)) {
            this.selectedAttributeOptions.push(event.option.value);
            this.updateAttributeOptionIdsControl();
        }
        this.attributeOptionInput.nativeElement.value = '';
        this.attributeOptionsCtrl.setValue(null);
        this.formGroup.markAsDirty();
    }


    removeAttributeOption(attributeOption: AttributeOption) {
        const index = this.selectedAttributeOptions.indexOf(attributeOption);

        if (index >= 0) {
            this.selectedAttributeOptions.splice(index, 1);
            this.updateAttributeOptionIdsControl();
            this.announcer.announce(`Removed ${this.allAttributeOptions.at(index)!.value}`);
        }
        this.formGroup.markAsDirty();
    }

    updateAttributeOptionIdsControl() {
        const attributeOptionIds = this.selectedAttributeOptions.map(attributeOption => attributeOption.id!);
        this.formGroup.controls.attributeOptionIds.setValue(attributeOptionIds, {emitEvent: false});

    }

}

