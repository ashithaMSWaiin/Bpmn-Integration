/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    applicationType?: string | null;
    clientId?: string | null;
    displayName?: string | null;
    clientType?: string | null;
    clientSecret?: string | null;
    consentType?: string | null;
    extensionGrantTypes?: Array<string> | null;
    postLogoutRedirectUris?: Array<string> | null;
    redirectUris?: Array<string> | null;
    allowPasswordFlow?: boolean;
    allowClientCredentialsFlow?: boolean;
    allowAuthorizationCodeFlow?: boolean;
    allowRefreshTokenFlow?: boolean;
    allowHybridFlow?: boolean;
    allowImplicitFlow?: boolean;
    allowLogoutEndpoint?: boolean;
    allowDeviceEndpoint?: boolean;
    scopes?: Array<string> | null;
    clientUri?: string | null;
    logoUri?: string | null;
};
