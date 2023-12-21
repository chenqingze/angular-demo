import {environment} from '../../environments/environment';

interface GlobalConfig {
    [key: string]: string;

    authStrategy: 'session' | 'oauth2' | string;
}

const GLOBAL_CONFIG: GlobalConfig = {
    appPrefix: `${environment.appName}-`,
    apiBaseUrl: `${environment.apiBaseUrl}`,
    authStrategy: `${environment.authStrategy}`
};

export {GlobalConfig, GLOBAL_CONFIG}