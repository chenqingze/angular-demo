import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
    selector: 'page-footer',
    standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule
    ],
    templateUrl: './page-footer.component.html',
    styleUrl: './page-footer.component.scss'
})
export class PageFooterComponent {

}
