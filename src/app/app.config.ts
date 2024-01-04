import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration} from '@angular/common/http';
import {headerInterceptor} from './core/interceptors/header.interceptor';
import {apiUrlInterceptor} from './core/interceptors/api-url.interceptor';
import {loggingInterceptor} from './core/interceptors/logging.interceptor';
import {authStrategyProvider} from './core/services/auth.strategy';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {xAuthTokenInterceptor} from './core/interceptors/x-auth-token.interceptor';
import {NgxWigComponent} from 'ngx-wig';
import {IMAGE_LOADER, ImageLoaderConfig} from '@angular/common';
import {GLOBAL_CONFIG} from './core/global-config';

const MY_PLUGIN = {
    edithtml: {
        label: 'Custom button',
        title: 'Custom button',
        command: (ctx: NgxWigComponent) => {
            alert('This is a custom button');
        },
        styleClass: 'nw-button',
        icon: 'icon-custom'
    }
};

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: IMAGE_LOADER,
            useValue: (config: ImageLoaderConfig) => {
                return `${GLOBAL_CONFIG.loadImageUrl}/${config.src}`;
                // return `http://localhost:8080/files/?src=${config.src}&width=${config.width}`;
            },
        },
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}, //Appearance Options — Set Globally
        provideRouter(routes),
        provideHttpClient(
            withFetch(),
            withInterceptors([
                apiUrlInterceptor,
                headerInterceptor,
                xAuthTokenInterceptor,
                // xsrfInterceptor,
                errorInterceptor,
                loggingInterceptor
            ]),
            withXsrfConfiguration({})
        ),
        authStrategyProvider,
        provideClientHydration(),
        provideAnimations()]
};
