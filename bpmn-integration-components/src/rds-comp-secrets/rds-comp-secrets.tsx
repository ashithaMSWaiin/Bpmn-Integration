
import React, { useEffect, useState } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompSecretsProps { 
    onSaveHandler?: (data: any) => void;
    default?: any;
    reset?: boolean;
}

const RdsCompSecrets = (props: RdsCompSecretsProps) => {
    const [data, setdata] = useState(props.default);
    const [inputReset, setInputReset] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setdata(props.default);
    }, [props.default]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {
        setdata({ ...data, [key]: value });
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(data);
        setInputReset(!inputReset);
        setdata({
            type: "",
            value: "",
            expiration: "",
            description: ""
        });
    }

    return (
        <>
            <div className="secrets">
                <div className="custom-content-scroll">
                    <div className="row mt-3">
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
                                label="Type"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Type"
                                required={true}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "type");
                                  }}
                                  value={data?.type}
                                dataTestId="type"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
                                label="Value"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Value"
                                required={true}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "val");
                                  }}
                                  value={data?.val}
                                dataTestId="value"
                            ></RdsInput>
                        </div>
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
                                label="Expiration"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Expiration"
                                required={true}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "expiration");
                                  }}
                                  value={data?.expiration}
                                dataTestId="expiration"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <RdsInput
                            label="Description"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Enter Description"
                            required={true}
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "description");
                              }}
                              value={data?.description}
                            dataTestId="description"
                            reset={inputReset}
                        ></RdsInput>
                    </div>
                    <div className="mt-3 mb-3">
                        <RdsButton
                            size="small"
                            tooltip={true}
                            tooltipPlacement="top"
                            tooltipTitle="Add Data"
                            colorVariant="primary"
                            label={t("Add") || ""}
                            type="button"
                            dataTestId="add"
                        ></RdsButton>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse ps-3 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <div className="d-flex">
                        <div className="m-2">
                            <RdsButton
                                size="small"
                                isOutline={true}
                                tooltip={true}
                                tooltipPlacement="top"
                                tooltipTitle="Cancel"
                                colorVariant="primary"
                                label={t("Cancel") || ""}
                                data-bs-dismiss="offcanvas"
                                type="button"
                                dataTestId="cancel"
                            ></RdsButton>
                        </div>
                        <div className="m-2">
                            <RdsButton
                                size="small"
                                isOutline={false}
                                tooltip={true}
                                tooltipPlacement="top"
                                tooltipTitle="Create Data"
                                colorVariant="primary"
                                label={t("Create") || ""}
                                data-bs-dismiss="offcanvas"
                                type="button"
                                dataTestId="create"
                                onClick={(e: any) => emitSaveData(e)}
                            ></RdsButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsCompSecrets;
