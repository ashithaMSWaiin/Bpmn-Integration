/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuditLoggingSettingsWidgetService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getSettingsWidgetsAuditLogSettingGroup(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/settings-widgets/audit-log-setting-group',
        });
    }

}
