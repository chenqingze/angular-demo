import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public notification$: Subject<string> = new Subject();
    time: number = 3000;

    constructor(private snackBar: MatSnackBar) {
        this.notification$.subscribe(message => {
            this.snackBar.open(message, '关闭', {
                duration: this.time,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            })
        });
    }

}
