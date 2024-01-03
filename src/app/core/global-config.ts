import {environment} from '../../environments/environment';

interface GlobalConfig {
    appPrefix: string;
    authStrategy: 'session' | 'oauth2' | string;
    apiBaseUrl: string;
    csrfUrl: string;
    loginUrl: string;
    logoutUrl: string;
    userProfileUrl: string;
    uploadFileUrl: string;
    loadImageUrl: string;
}

const GLOBAL_CONFIG: GlobalConfig = {
    appPrefix: `${environment.appName}-`,
    authStrategy: environment.authStrategy,
    apiBaseUrl: environment.apiBaseUrl,
    csrfUrl: environment.csrfUrl,
    loginUrl: environment.loginUrl,
    logoutUrl: environment.logoutUrl,
    userProfileUrl: environment.userProfileUrl,
    uploadFileUrl: environment.uploadFileUrl,
    loadImageUrl: environment.loadImageUrl,
};

export {GlobalConfig, GLOBAL_CONFIG}