import {Component, HostListener} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {finalize} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

interface LoginForm {
    username: FormControl<string>;
    password?: FormControl<string>;
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private authService: AuthService,
        public snackBar: MatSnackBar
    ) {
        this.loginForm = new FormGroup<LoginForm>({
            username: new FormControl<string>('', {nonNullable: true}),
            password: new FormControl<string>('', {nonNullable: true}),
        });
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.loginForm.valid && this.login();
        }
    }

    login() {
        this.loginForm.disable();
        this.authService.loginWithUserCredentials(this.loginForm.value)
            .pipe(finalize(() => this.loginForm.enable()))
            .subscribe({
                error: () => {
                    this.snackBar.open('用户名或密码错误!', '', {
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'bottom'
                    });
                }
            });
    }
}
