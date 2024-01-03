import {Injectable} from '@angular/core';
import {GLOBAL_CONFIG} from '../global-config';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private APP_PREFIX = GLOBAL_CONFIG.appPrefix;

    public get(key: string): any {
        const item = localStorage.getItem(`${this.APP_PREFIX}${key}`);
        try {
            return item ? JSON.parse(item) : item;
        } catch (e) {
            return item;
        }
    }

    public set(key: string, value: unknown) {
        let saveValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(
            `${this.APP_PREFIX}${key}`,
            saveValue
        );
    }

    public has(key: string): boolean {
        return !!localStorage.getItem(key);
    }

    public remove(key: string) {
        localStorage.removeItem(`${this.APP_PREFIX}${key}`);
    }

    public clear() {
        localStorage.clear();
    }
}
