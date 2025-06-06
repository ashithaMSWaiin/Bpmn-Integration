import React, { useEffect, useState } from "react";
import { RdsLabel, RdsInput, RdsCheckbox, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompNewRoleProps {
    roleData: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompNewRole = (props: RdsCompNewRoleProps) => {
    const { t } = useTranslation();
    const [roleData, setRoleData] = useState(props.roleData);

    useEffect(() => {
        setRoleData(props.roleData);
    }, [props.roleData]);

    const handleDataChange = (value: any, key: string) => {
        setRoleData({ ...roleData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(roleData);
        setRoleData({
            displayName: "",
            isDefault: false,
        });
    }

    return (
        <>
            <div>
                <form>
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        size="medium"
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        label="Role Name"
                                        value={roleData?.displayName}
                                        onChange={(e) => {
                                            handleDataChange(e.target.value, "displayName");
                                        }}
                                        placeholder="Enter Role Name"
                                        required={true}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group ms-1">
                                    <RdsCheckbox
                                        label="Default"
                                        checked={roleData?.isDefault}
                                        onChange={(e) => {
                                            handleDataChange(e.target.checked, "isDefault");
                                        }}
                                    ></RdsCheckbox>
                                    <div className="fw-normal opacity-50">
                                        <RdsLabel
                                            label="Assign to new users by default"
                                            size="14px"
                                        ></RdsLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                <div className="footer fixed-bottom ms-3 mb-3">
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
                        ></RdsButton>
                        </div>
                        <div className="m-2">
                        <RdsButton
                            size="small"
                            isOutline={false}
                            tooltip={true}
                            tooltipPlacement="top"
                            tooltipTitle="Save Data"
                            colorVariant="primary"
                            label={t("Save") || ""}
                            data-bs-dismiss="offcanvas"
                            onClick={(e: any) => emitSaveData(e)}
                            type="button"
                        ></RdsButton>
                </div>
                    </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompNewRole;
