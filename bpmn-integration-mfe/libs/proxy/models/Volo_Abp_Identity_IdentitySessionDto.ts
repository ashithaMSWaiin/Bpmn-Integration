/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_Identity_IdentitySessionDto = {
    id?: string;
    sessionId?: string | null;
    isCurrent?: boolean;
    device?: string | null;
    deviceInfo?: string | null;
    tenantId?: string | null;
    tenantName?: string | null;
    userId?: string;
    userName?: string | null;
    clientId?: string | null;
    ipAddresses?: Array<string> | null;
    signedIn?: string;
    lastAccessed?: string | null;
};
