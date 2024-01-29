import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AttributeGroupsDialogComponent} from './attribute-groups-dialog.component';

describe('AttributeGroupsDialogComponent', () => {
    let component: AttributeGroupsDialogComponent;
    let fixture: ComponentFixture<AttributeGroupsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AttributeGroupsDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AttributeGroupsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
