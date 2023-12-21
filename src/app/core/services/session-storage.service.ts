import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    private APP_PREFIX = `${environment.appName}-`;

    public get(key: string): any {
        const item = sessionStorage.getItem(`${this.APP_PREFIX}${key}`);
        try {
            return item ? JSON.parse(item) : item;
        } catch (e) {
            return item;
        }
    }

    public set(key: string, value: unknown) {
        let saveValue = typeof value === 'string' ? value : JSON.stringify(value);
        sessionStorage.setItem(
            `${this.APP_PREFIX}${key}`,
            saveValue
        );
    }

    public has(key: string): boolean {
        return !!sessionStorage.getItem(key);
    }

    public remove(key: string) {
        sessionStorage.removeItem(`${this.APP_PREFIX}${key}`);
    }

    public clear() {
        sessionStorage.clear();
    }

}
