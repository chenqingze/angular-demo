import {HttpInterceptorFn, HttpXsrfTokenExtractor} from '@angular/common/http';
import {inject} from '@angular/core';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieHeaderName = 'X-XSRF-TOKEN';
    const tokenExtractor = inject(HttpXsrfTokenExtractor);
    const csrfToken = tokenExtractor.getToken() as string;
    if (csrfToken !== null && !req.headers.has(cookieHeaderName)) {
        const xsrfReq = req.clone({
            headers: req.headers.set(cookieHeaderName, csrfToken),
        });
        return next(xsrfReq);
    }
    return next(req);
};
