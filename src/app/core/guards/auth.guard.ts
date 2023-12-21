import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, tap} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService)
    return authService.isLoggedIn$()
        .pipe(
            tap((isLoggedIn) => {
                if (isLoggedIn) {
                    router.navigateByUrl(authService.DEFAULT_PATH);
                }
            }),
            map((isLoggedIn) => !isLoggedIn)
        );
};
