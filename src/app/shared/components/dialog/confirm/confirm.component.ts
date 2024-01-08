import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

export interface ConfirmDialogData {
    title?: string;
    message?: string;
    confirmCaption?: string;
    cancelCaption?: string;
}

@Component({
    selector: 'app-confirm',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    }

    ngOnInit(): void {
    }
}
