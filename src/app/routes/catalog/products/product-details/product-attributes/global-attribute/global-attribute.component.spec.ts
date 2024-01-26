import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GlobalAttributeComponent} from './global-attribute.component';

describe('GlobalAttributeComponent', () => {
    let component: GlobalAttributeComponent;
    let fixture: ComponentFixture<GlobalAttributeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GlobalAttributeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GlobalAttributeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
