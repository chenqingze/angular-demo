import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-attribute-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        ReactiveFormsModule
    ],
    templateUrl: './attribute-list.component.html',
    styleUrl: './attribute-list.component.scss'
})
export class AttributeListComponent {

    addAttribute() {

    }
}
