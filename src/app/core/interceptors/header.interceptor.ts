import {HttpInterceptorFn} from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

    if (!req.body && !req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
        const headerReq = req.clone({
            headers: req.headers
                .set('Content-Type', 'application/json')
                .set('X-Requested-With', 'XMLHttpRequest')// 使用Basic Auth授权登录时，阻止spring boot 在授权失败响应头中返回WWW-Authenticate，从而导致浏览器弹出basic auth对话框
        });
        return next(headerReq);
    }
    return next(req);
};
