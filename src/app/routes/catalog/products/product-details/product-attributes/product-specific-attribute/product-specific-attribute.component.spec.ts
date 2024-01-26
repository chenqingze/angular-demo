import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductSpecificAttributeComponent} from './product-specific-attribute.component';

describe('ProductSpecificAttributeComponent', () => {
    let component: ProductSpecificAttributeComponent;
    let fixture: ComponentFixture<ProductSpecificAttributeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductSpecificAttributeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductSpecificAttributeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
