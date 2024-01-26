import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductClassAttributeComponent} from './product-class-attribute.component';

describe('ProductClassAttributeComponent', () => {
    let component: ProductClassAttributeComponent;
    let fixture: ComponentFixture<ProductClassAttributeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductClassAttributeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductClassAttributeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
