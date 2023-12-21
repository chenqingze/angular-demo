import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {SessionStorageService} from './session-storage.service';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {AUTH_STRATEGY, AuthStrategy} from './auth.strategy';
import {User} from '../../shared/models/user';

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

    // private readonly LOCAL_STORAGE_KEY_AUTHENTICATED = 'AUTHENTICATED';
    private readonly LOCAL_STORAGE_KEY_X_AUTH_TOKEN = 'X-AUTH-TOKEN';
    private readonly LOCAL_STORAGE_KEY_SESSION_USER = 'SESSION-USER';
    private readonly SESSION_STORAGE_KEY_REDIRECT_URL = 'REDIRECT_URL';

    public readonly DEFAULT_PATH = "/";
    public readonly LOGIN_PATH = "/login";
    public readonly LOGOUT_PATH = "/logout";

    private _redirectUrl: string = this.DEFAULT_PATH;

    constructor(private router: Router,
                private http: HttpClient,
                @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>,
                private localStorageService: LocalStorageService,
                private sessionStorageService: SessionStorageService) {
    }

    get redirectUrl(): string {
        return this._redirectUrl || this.DEFAULT_PATH;
    }

    set redirectUrl(url: string) {
        this._redirectUrl = url;
    }

    /**
     * 用户名和密码登录
     * @param credentials
     */
    loginWithUserCredentials(credentials: LoginRequest): Observable<any> {
        const headers = new HttpHeaders(
            credentials ? {authorization: 'Basic ' + btoa(unescape(encodeURIComponent(credentials.username + ':' + credentials.password)))} : {}
        );
        return this.http.get('/me', {headers: headers}).pipe(tap((user) => this.doAfterLogin(user as User)));
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

    doAfterLogin(user: User) {
        console.log(user);
        this.auth.doLoginUser(user)
        this.doRedirect();
    }

    doRedirect() {
        if (this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl).then(() => this.redirectUrl = this.DEFAULT_PATH);
        } else {
            this.router.navigateByUrl(this.DEFAULT_PATH).then();
        }
    }

    logout(callback?: Function) {
        this.http
            .post(this.LOGOUT_PATH, {})
            .pipe(
                tap(() => this.auth.doLogoutUser()),
                finalize(() => {
                    this.doAfterLogout();
                })
            )
            .subscribe(callback && callback());
    }

    doAfterLogout() {
        this.auth.doLogoutUser();
        this.router.navigateByUrl(this.LOGIN_PATH);
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
