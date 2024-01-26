import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HiddenAttributeComponent} from './hidden-attribute.component';

describe('HiddenAttributeComponent', () => {
    let component: HiddenAttributeComponent;
    let fixture: ComponentFixture<HiddenAttributeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HiddenAttributeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HiddenAttributeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
