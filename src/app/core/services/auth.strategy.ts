import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL_CONFIG} from '../global-config';
import {SessionAuth} from './session-auth.strategy';
import {Oauth2Auth} from './oauth2-auth.strategy';

interface AuthStrategy<T> {
    doLoginUser(data: T): void;

    doLogoutUser(): void;

    getCurrentUser(): Observable<User>;
}

const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>(
    "AuthStrategy"
);

const authStrategyProvider = {
    provide: AUTH_STRATEGY,
    deps: [HttpClient],
    useFactory: (http: HttpClient) => {
        switch (GLOBAL_CONFIG.authStrategy) {
            case 'session':
                return new SessionAuth(http);
            case 'oauth2':
                return new Oauth2Auth();
            default:
                throw new Error('auth strategy configuration error');

        }
    },
};
export {AuthStrategy, AUTH_STRATEGY, authStrategyProvider};