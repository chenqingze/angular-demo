import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageInputComponent} from './image-input.component';

describe('PictureInputComponent', () => {
    let component: ImageInputComponent;
    let fixture: ComponentFixture<ImageInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImageInputComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImageInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
