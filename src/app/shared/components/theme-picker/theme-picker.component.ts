import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteTheme, ThemeService} from '../../../core/services/theme.service';
import {map, Subscription} from 'rxjs';
import {StyleManager} from './style-manager';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'theme-picker',
    standalone: true,
    imports: [],
    templateUrl: './theme-picker.component.html',
    styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent implements OnInit, OnDestroy {
    currentTheme: SiteTheme | undefined;
    // The below colors need to align with the themes defined in theme-picker.scss
    themes: SiteTheme[] = [
        {
            primary: '#673AB7',
            accent: '#FFC107',
            displayName: 'Deep Purple & Amber',
            name: 'deeppurple-amber',
            isDark: false,
        },
        {
            primary: '#3F51B5',
            accent: '#E91E63',
            displayName: 'Indigo & Pink',
            name: 'indigo-pink',
            isDark: false,
            isDefault: true,
        },
        {
            primary: '#E91E63',
            accent: '#607D8B',
            displayName: 'Pink & Blue-grey',
            name: 'pink-bluegrey',
            isDark: true,
        },
        {
            primary: '#9C27B0',
            accent: '#4CAF50',
            displayName: 'Purple & Green',
            name: 'purple-green',
            isDark: true,
        },
    ];
    private _queryParamSubscription = Subscription.EMPTY;

    constructor(public styleManager: StyleManager,
                private themeService: ThemeService,
                private _activatedRoute: ActivatedRoute,
                private liveAnnouncer: LiveAnnouncer,
                iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('theme-icon',
            sanitizer.bypassSecurityTrustResourceUrl(
                'assets/img/theme-icon.svg'));
        const themeName = this.themeService.getStoredThemeName();
        if (themeName) {
            this.selectTheme(themeName);
        }
    }

    ngOnInit() {
        this._queryParamSubscription = this._activatedRoute.queryParamMap
            .pipe(map((params: ParamMap) => params.get('theme')))
            .subscribe((themeName: string | null) => {
                if (themeName) {
                    this.selectTheme(themeName);
                }
            });
    }

    ngOnDestroy() {
        this._queryParamSubscription.unsubscribe();
    }

    selectTheme(themeName: string) {
        const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

        if (!theme) {
            return;
        }

        this.currentTheme = theme;

        if (theme.isDefault) {
            this.styleManager.removeStyle('theme');
        } else {
            // this.styleManager.setStyle('theme', `assets/${theme.name}.css`);
            this.styleManager.setStyle('theme', `${theme.name}.css`);
        }

        if (this.currentTheme) {
            this.liveAnnouncer.announce(`${theme.displayName} theme selected.`, 'polite', 3000);
            this.themeService.storeTheme(this.currentTheme);
        }
    }
}
