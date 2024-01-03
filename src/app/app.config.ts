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

export const appConfig: ApplicationConfig = {
    providers: [
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
