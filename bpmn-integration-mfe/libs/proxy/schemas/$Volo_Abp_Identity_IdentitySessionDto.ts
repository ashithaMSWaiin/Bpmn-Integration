/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentitySessionDto = {
    properties: {
        id: {
    type: 'string',
    format: 'uuid',
},
        sessionId: {
    type: 'string',
    isNullable: true,
},
        isCurrent: {
    type: 'boolean',
},
        device: {
    type: 'string',
    isNullable: true,
},
        deviceInfo: {
    type: 'string',
    isNullable: true,
},
        tenantId: {
    type: 'string',
    isNullable: true,
    format: 'uuid',
},
        tenantName: {
    type: 'string',
    isNullable: true,
},
        userId: {
    type: 'string',
    format: 'uuid',
},
        userName: {
    type: 'string',
    isNullable: true,
},
        clientId: {
    type: 'string',
    isNullable: true,
},
        ipAddresses: {
    type: 'array',
    contains: {
    type: 'string',
},
    isNullable: true,
},
        signedIn: {
    type: 'string',
    format: 'date-time',
},
        lastAccessed: {
    type: 'string',
    isNullable: true,
    format: 'date-time',
},
    },
} as const;
