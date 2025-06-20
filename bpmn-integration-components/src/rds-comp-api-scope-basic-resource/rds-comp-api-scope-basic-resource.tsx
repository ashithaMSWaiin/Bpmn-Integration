import React, { useEffect, useState } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApiScopeBasicResourceProps {
    scopeData: any
    onSuccess?: any;
    reset?: boolean
}

const RdsCompApiScopeBasicResource = (props: RdsCompApiScopeBasicResourceProps) => {
    const { t } = useTranslation();
    const [fieldScopeData, setFieldScopeData] = useState(props.scopeData);
    const [inputReset, setInputReset] = useState(props.reset)
    useEffect(() => {
        setFieldScopeData(props.scopeData);
    }, [props.scopeData]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

    const isEmailValid = (email: any) => {
        if (!fieldScopeData?.name || fieldScopeData?.name.length === 0) {
            return false;
        }
        return true;
    };
    const inputHandlerChange = (event: any, key: string) => {
        setFieldScopeData({ ...fieldScopeData, [key]: event.target.value });
    };

    const isFormValid = isEmailValid(fieldScopeData?.email);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSuccess && props.onSuccess(fieldScopeData);
        setInputReset(!inputReset);
        setFieldScopeData({
            id: "",
            name: "",
            displayName: "",
            description: "",
            resources: "",
        });
    };
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <RdsInput
                                reset={inputReset}
                                required={true}
                                label={t("AbpOpenIddict.Name") || ""}
                                placeholder={t("Enter Name") || ""}
                                inputType='text'
                                onChange={(e) => inputHandlerChange(e, "name")}
                                value={fieldScopeData?.name}
                                name={"email"}
                                dataTestId="name"
                            ></RdsInput>

                        </div>

                        <div className="col-md-6 ">
                            <RdsInput
                                reset={inputReset}
                                label={t("AbpOpenIddict.DisplayName") || ""}
                                placeholder={t("Enter Display Name") || ""}
                                inputType='text'
                                onChange={(e) => inputHandlerChange(e, "displayName")}
                                required={false}
                                name={"Displayname"}
                                value={fieldScopeData?.displayName}
                                dataTestId="display-name"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className=" mb-3 mt-2">
                        <RdsInput
                            reset={inputReset}
                            label={t("AbpOpenIddict.Description") || ""}
                            placeholder={t("Enter Description") || ""}
                            inputType='text'
                            onChange={(e) => inputHandlerChange(e, "description")}
                            required={false}
                            name={"Description"}
                            value={fieldScopeData?.description}
                            dataTestId="desc"
                        ></RdsInput>
                    </div>
                    <div className=" mb-3">
                        <RdsTextArea
                            label={t("AbpOpenIddict.Resources") || ""}
                            placeholder={t("Enter Resources") || ""}
                            onChange={(e) => inputHandlerChange(e, "resources")}
                            rows={3}
                            value={fieldScopeData?.resources}
                            dataTestId="resources"
                        />
                    </div>
                    <div>
                        {/* <label className="Text-bold" >Others</label>
            <RdsCheckboxGroup itemList={props.resourceData.checklist} /> */}
                    </div>
                    <div className="mt-3 d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label={t("AbpUi.Cancel") || ""}
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label={t("AbpUi.Save") || ""}
                            size="small"
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            isDisabled={!isFormValid}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompApiScopeBasicResource;
