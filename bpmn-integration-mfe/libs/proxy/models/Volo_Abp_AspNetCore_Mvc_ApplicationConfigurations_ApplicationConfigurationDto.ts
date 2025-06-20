/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationAuthConfigurationDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationAuthConfigurationDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationFeatureConfigurationDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationFeatureConfigurationDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationGlobalFeatureConfigurationDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationGlobalFeatureConfigurationDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationConfigurationDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationConfigurationDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationSettingConfigurationDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationSettingConfigurationDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ClockDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ClockDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentUserDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentUserDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ObjectExtensionsDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ObjectExtensionsDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_TimingDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_TimingDto';
import type { Volo_Abp_AspNetCore_Mvc_MultiTenancy_CurrentTenantDto } from './Volo_Abp_AspNetCore_Mvc_MultiTenancy_CurrentTenantDto';
import type { Volo_Abp_AspNetCore_Mvc_MultiTenancy_MultiTenancyInfoDto } from './Volo_Abp_AspNetCore_Mvc_MultiTenancy_MultiTenancyInfoDto';

export type Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto = {
    localization?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationConfigurationDto;
    auth?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationAuthConfigurationDto;
    setting?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationSettingConfigurationDto;
    currentUser?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentUserDto;
    features?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationFeatureConfigurationDto;
    globalFeatures?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationGlobalFeatureConfigurationDto;
    multiTenancy?: Volo_Abp_AspNetCore_Mvc_MultiTenancy_MultiTenancyInfoDto;
    currentTenant?: Volo_Abp_AspNetCore_Mvc_MultiTenancy_CurrentTenantDto;
    timing?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_TimingDto;
    clock?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ClockDto;
    objectExtensions?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ObjectExtensionsDto;
    extraProperties?: Record<string, any> | null;
};
