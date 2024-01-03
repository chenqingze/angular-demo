import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs';

export const appGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return authService.isLoggedIn$().pipe(
        tap((isLoggedIn) => {
            if (!isLoggedIn) {
                router.navigate([authService.LOGIN_PATH], {skipLocationChange: true});
            }
        })
    );
};
