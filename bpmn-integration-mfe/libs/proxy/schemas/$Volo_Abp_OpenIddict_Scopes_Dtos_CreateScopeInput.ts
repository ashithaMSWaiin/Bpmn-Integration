/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput = {
    properties: {
        extraProperties: {
    type: 'dictionary',
    contains: {
    properties: {
    },
},
    isReadOnly: true,
    isNullable: true,
},
        name: {
    type: 'string',
    isRequired: true,
    minLength: 1,
    pattern: '\\w+',
},
        displayName: {
    type: 'string',
    isNullable: true,
},
        description: {
    type: 'string',
    isNullable: true,
},
        resources: {
    type: 'array',
    contains: {
    type: 'string',
},
    isNullable: true,
},
    },
} as const;
