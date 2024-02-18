import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryAttributeComponent} from './category-attribute.component';

describe('CategoryAttributeComponent', () => {
    let component: CategoryAttributeComponent;
    let fixture: ComponentFixture<CategoryAttributeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CategoryAttributeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CategoryAttributeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
