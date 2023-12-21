import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration} from '@angular/common/http';
import {headerInterceptor} from './core/interceptors/header.interceptor';
import {apiUrlInterceptor} from './core/interceptors/api-url.interceptor';
import {loggingInterceptor} from './core/interceptors/logging.interceptor';
import {xsrfInterceptor} from './core/interceptors/xsrf.interceptor';
import {authStrategyProvider} from './core/services/auth.strategy';

export const appConfig: ApplicationConfig = {
    providers: [

        provideRouter(routes),
        provideHttpClient(
            withFetch(),
            withInterceptors([
                apiUrlInterceptor,
                headerInterceptor,
                xsrfInterceptor,
                // tokenInterceptor,
                loggingInterceptor
            ]),
            withXsrfConfiguration({})
        ),
        authStrategyProvider,
        provideClientHydration(),
        provideAnimations()]
};
