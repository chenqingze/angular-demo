import {AuthStrategy} from './auth.strategy';
import {Token} from '../../shared/models/token';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';

export class Oauth2Auth implements AuthStrategy<Token> {
    doLoginUser(data: Token): void {
        throw new Error('Method not implemented.');
    }

    doLogoutUser(): void {
        throw new Error('Method not implemented.');
    }

    getCurrentUser(): Observable<User> {
        throw new Error('Method not implemented.');
    }
}
