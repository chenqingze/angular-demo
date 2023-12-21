import {AuthStrategy} from './auth.strategy';
import {User} from '../../shared/models/user';
import {Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class SessionAuth implements AuthStrategy<User> {

    private loggedUser: User | undefined;

    constructor(private http: HttpClient) {
    }

    doLoginUser(user: User): void {
        this.loggedUser = user;
    }

    doLogoutUser(): void {
        this.loggedUser = undefined;
    }

    getCurrentUser(): Observable<User> {
        if (this.loggedUser) {
            return of(this.loggedUser);
        } else {
            return this.http.get<User>('/me').pipe(tap((user) => (this.loggedUser = user)));
        }
    }
}
