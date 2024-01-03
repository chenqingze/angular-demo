import {HttpInterceptorFn} from '@angular/common/http';

import {GLOBAL_CONFIG} from '../global-config';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
    // 如果请求的 URL 不是绝对路径，则在前面添加 API 主机名
    if (!req.url.startsWith('http')) {
        const apiReq = req.clone({url: `${GLOBAL_CONFIG.apiBaseUrl}${req.url}`});
        return next(apiReq);
    }
    return next(req);
};
