/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ConfirmEmailInput = {
    properties: {
        userId: {
    type: 'string',
    isRequired: true,
    format: 'uuid',
},
        token: {
    type: 'string',
    isRequired: true,
    minLength: 1,
},
    },
} as const;
