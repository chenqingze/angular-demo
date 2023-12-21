import {EventEmitter, Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

export interface SiteTheme {
    name: string;
    displayName?: string;
    accent: string;
    primary: string;
    isDark?: boolean;
    isDefault?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    static storageKey = 'theme-storage-current-name';
    onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();

    constructor(private localStorageService: LocalStorageService) {
    }

    storeTheme(theme: SiteTheme) {
        this.localStorageService.set(ThemeService.storageKey, theme.name);

        this.onThemeUpdate.emit(theme);
    }

    getStoredThemeName(): string | null {
        try {
            return this.localStorageService.get(ThemeService.storageKey) || null;
        } catch {
            return null;
        }
    }

    clearStorage() {
        try {
            this.localStorageService.remove(ThemeService.storageKey);
        } catch {
        }
    }
}
