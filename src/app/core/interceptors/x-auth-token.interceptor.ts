import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const xAuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.xAuthToken;
    // add authorization token for full api requests
    if (token) {
        const authRequest = req.clone({
            // 增加身份验证token,这里使用的是spring session 默认的'X-Auth-Token'作为key
            headers: req.headers.set('X-Auth-Token', token),
        });
        return next(authRequest);
    }
    return next(req);
};
