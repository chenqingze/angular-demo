import {CanActivateFn, Router} from '@angular/router';
import {tap} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const appGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    return inject(AuthService).isLoggedIn$().pipe(
        tap((isLoggedIn) => {
            if (!isLoggedIn) {
                router.navigate(["/login"]);
            }
        })
    );
};
