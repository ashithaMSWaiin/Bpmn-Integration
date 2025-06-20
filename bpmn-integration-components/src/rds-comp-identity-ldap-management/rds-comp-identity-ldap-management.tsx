import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";


export interface RdsCompIdentityLdapManagementProps {
    ldapData: any
    onLdapSettingsSubmit?: any
}
const RdsCompIdentityLdapManagement = (props: RdsCompIdentityLdapManagementProps) => {
    const [ldap, setLdap] = useState(props.ldapData);
    const { t } = useTranslation();

    useEffect(() => {
        setLdap(props.ldapData);
    }, [props.ldapData]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    const handleChangeform = (value: any, key: any) => {
        setLdap({ ...ldap, [key]: value });
    }

    return (
        <div className="pt-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 fw-medium">
                    <RdsLabel label={t("AbpIdentity.LdapLoginSettings") || ""}></RdsLabel>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <RdsCheckbox
                        label={t("AbpIdentity.DisplayName:Abp.Identity.EnableLdapLogin") || ""}
                        onChange={(e: any) => { handleChangeform(e.target.checked, "enableLdapLogin"); }}
                        checked={ldap?.enableLdapLogin}
                        dataTestId="use-default-credential"
                    ></RdsCheckbox>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={ldap?.ldapServerHost}
                                name="serverHost"
                                label={t("AbpLdap.DisplayName:Abp.Ldap.ServerHost") || ""}
                                placeholder={t("Enter Server Host") || ""}
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "ldapServerHost")}
                                dataTestId="server-host"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput mb-3">
                        <RdsInput
                            placeholder={t("389") || ""}
                            customClasses="form-control"
                            inputType="text"
                            label={t("AbpLdap.DisplayName:Abp.Ldap.ServerPort") || ""}
                            name="ldapServerPort"
                            value={ldap?.ldapServerPort}
                            onChange={(e: any) => handleChangeform(e.target.value, "ldapServerPort")}
                            dataTestId="server-port"
                        ></RdsInput>

                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={ldap?.ldapBaseDc}
                                name="ldapBaseDc"
                                label={t("AbpLdap.Description:Abp.Ldap.BaseDc") || ""}
                                placeholder={t("Enter Base Domain Component") || ""}
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "ldapBaseDc")}
                                dataTestId="base-domain"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput mb-3">
                        <RdsInput
                            placeholder={t("AbpLdap.Description:Abp.Ldap.Domain") || ""}
                            customClasses="form-control"
                            inputType="text"
                            label={t("Enter Domain") || ""}
                            name="ldapDomain"
                            value={ldap?.ldapDomain}
                            onChange={(e: any) => handleChangeform(e.target.value, "ldapDomain")}
                            dataTestId="domain"
                        ></RdsInput>
                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={ldap?.ldapUserName}
                                name="ldapUserName"
                                label={t("AbpLdap.DisplayName:Abp.Ldap.UserName") || ""}
                                placeholder={t("Enter Username") || ""}
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "ldapUserName")}
                                dataTestId="username"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput mb-3">
                        <RdsInput
                            value={ldap?.ldapPassword}
                            name="ldapPassword"
                            label={t("AbpLdap.DisplayName:Abp.Ldap.Password") || ""}
                            placeholder={t("Enter Password") || ""}
                            inputType="password"
                            customClasses="form-control"
                            onChange={(e: any) => handleChangeform(e.target.value, "ldapPassword")}
                            dataTestId="password"
                            showIcon= {false}
                        ></RdsInput>
                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
                <div className="mt-xxl-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 pb-4 bg-transparent fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 identityInput position-absolute">
                    <RdsButton
                        label={t("AbpUi.Save") || ""}
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        onClick={() => { props.onLdapSettingsSubmit(ldap); }}
                    ></RdsButton>
                </div>

            </form>
        </div>
    );
};

export default RdsCompIdentityLdapManagement;