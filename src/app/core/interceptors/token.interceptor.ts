import {HttpInterceptorFn} from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    /*
        const authService = inject(AuthService);

        // add authorization token for full api requests
        if (authService.authenticated) {
            const authReq = req.clone({
                // 增加身份验证token,这里使用的是spring session 默认的'X-Auth-Token'作为key
                setHeaders: {'X-Auth-Token': authService.xAuthToken},
            });
            return next(authReq);
        }*/
    return next(req);
};
