import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {AuthService} from '../services/auth.service';
import {GLOBAL_CONFIG} from '../global-config';

export enum STATUS {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    let isHandlingUnauthorized = false;
    const router = inject(Router);
    const notification = inject(NotificationService);
    const authService = inject(AuthService);

    return next(req).pipe(catchError((httpErrorResponse: HttpErrorResponse) => {

        const errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];
        let message = 'An unknown error occurred!';
        if (httpErrorResponse.status === 0 || httpErrorResponse.error instanceof ErrorEvent) {
            // handle client-side or network error occurred Handle it accordingly.
            console.error('An client side error occurred:', httpErrorResponse.error);
            message = `Client Side Error:${httpErrorResponse.error.message}`;
        } else {
            // handle server-side error
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            // console.error('ERROR===', httpErrorResponse);
            // console.error(`Backend returned code ${httpErrorResponse.status}, message ${httpErrorResponse.message} body was: `, httpErrorResponse.error);
            if (errorPages.includes(httpErrorResponse.status)) {
                router.navigateByUrl(`/${httpErrorResponse.status}`, {skipLocationChange: true});
            } else {
                // console.error('ERROR', httpErrorResponse);
                // message = `Backend returned code ${httpErrorResponse.status} , Message: ${httpErrorResponse.message},  Body was: ` + httpErrorResponse.error;
                let errorBody;
                try {
                    errorBody = JSON.stringify(httpErrorResponse.error);
                } catch (e) {
                    errorBody = httpErrorResponse.error;
                }

                message = `Backend returned code ${httpErrorResponse.status} , Message: ${httpErrorResponse.message},  Body was:  ${errorBody}`;
                if (httpErrorResponse.status === STATUS.UNAUTHORIZED) {
                    const requestUrl = req.url; // 获取请求的 URL
                    console.log('Request URL:', requestUrl);
                    // 判断请求不是获取用户信息的请求,因为用户获取用户信息和用户认证都调用了次请求来完成。
                    if (requestUrl.includes(GLOBAL_CONFIG.userProfileUrl) || requestUrl === GLOBAL_CONFIG.userProfileUrl) {
                        return throwError(() => new Error(message));
                    }
                    if (isHandlingUnauthorized) {
                        return throwError(() => new Error(message));
                    }
                    isHandlingUnauthorized = true;
                    // 判断路由不适登录页面，则保存路由地址，等待登录后重定向到之前的页面
                    const routerUrl = router.url;
                    if (routerUrl !== authService.LOGIN_PATH) {
                        authService.redirectUrl = routerUrl;
                    }
                    authService.clearLoginUser();
                    router.navigateByUrl(authService.LOGIN_PATH, {skipLocationChange: true}).then(() => {
                        isHandlingUnauthorized = false
                    });
                }
            }
        }
        notification.notification$.next(message);
        return throwError(() => new Error(message));
    }));
};

