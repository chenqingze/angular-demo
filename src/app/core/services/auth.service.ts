import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {AUTH_STRATEGY, AuthStrategy} from './auth.strategy';
import {User} from '../../shared/models/user';
import {GLOBAL_CONFIG} from '../global-config';

export interface SMSVerificationRequest {
    phoneNumber: string;
    verificationCode: string;
}

export interface LoginRequest {
    username: string;
    password: string;
    otp?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    private readonly LOCAL_STORAGE_KEY_X_AUTH_TOKEN = 'X-AUTH-TOKEN';

    public readonly DEFAULT_PATH = "/";
    public readonly LOGIN_PATH = "/login";

    private _redirectUrl: string = this.DEFAULT_PATH;

    constructor(private router: Router,
                private http: HttpClient,
                @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>,
                private localStorageService: LocalStorageService) {
    }

    get xAuthToken() {
        return this.localStorageService.get(this.LOCAL_STORAGE_KEY_X_AUTH_TOKEN);
    }

    get redirectUrl(): string {
        return this._redirectUrl || this.DEFAULT_PATH;
    }

    set redirectUrl(url: string) {
        this._redirectUrl = url;
    }

    refreshCsrf() {
        this.http.get(GLOBAL_CONFIG.csrfUrl).subscribe();
    }

    clearLoginUser() {
        this.auth.doLogoutUser();
    }

    /**
     * 用户名和密码登录
     * @param credentials
     */
    loginWithUserCredentials(credentials: LoginRequest): Observable<any> {
        const headers = new HttpHeaders(
            credentials ? {authorization: 'Basic ' + btoa(unescape(encodeURIComponent(credentials.username + ':' + credentials.password)))} : {}
        );
        return this.http.get(GLOBAL_CONFIG.userProfileUrl, {headers: headers, observe: 'response'})
            .pipe(
                tap((response: any) => {
                    // 如果使用token的方式，保存x-auth-token
                    const xAuthToken = response.headers.get('X-Auth-Token');
                    this.localStorageService.set(this.LOCAL_STORAGE_KEY_X_AUTH_TOKEN, xAuthToken);
                    // this.refreshCsrf();
                    this.auth.doLoginUser(response.body.principal as User)
                    this.doRedirect();
                })
            );
    }

    /**
     * 请求验证码
     * @param phoneNumber
     */
    sendSMSVerificationCode(phoneNumber: String): Observable<any> {
        return this.http.post('/send-sms-verification-code', {phoneNumber: phoneNumber})
    }

    /**
     * 验证短信码
     * @param logRequest
     */
    verifySMSVerificationCode(logRequest: LoginRequest): Observable<any> {
        return this.http.post('/verify-sms-verification-code', logRequest);
    }

    doRedirect() {
        if (this.redirectUrl && this.redirectUrl !== this.LOGIN_PATH) {
            this.router.navigateByUrl(this.redirectUrl).then(() => this.redirectUrl = this.DEFAULT_PATH);
        } else {
            this.router.navigateByUrl(this.DEFAULT_PATH).then();
        }
    }

    logout(callback?: Function) {
        this.http
            .post(GLOBAL_CONFIG.logoutUrl, {})
            .pipe(
                tap(() => {
                    this.refreshCsrf();
                    this.auth.doLogoutUser();
                }),
                finalize(() => {
                    this.router.navigateByUrl(this.LOGIN_PATH);
                })
            )
            .subscribe(callback && callback());
    }


    isLoggedIn$(): Observable<boolean> {
        return this.getCurrentUser$().pipe(
            map((user) => !!user),
            catchError(() => of(false))
        );
    }

    getCurrentUser$(): Observable<User> {
        return this.auth.getCurrentUser();
    }

    /* getUserRole$(): Observable<string> {
         return this.auth.getCurrentUser().pipe(map((user) => user.role));
     }*/

}
