import React, { useState, useEffect } from "react";
import {
    RdsLabel,
    RdsIcon,
    RdsOffcanvas,
    RdsNavtabs,
    RdsButton,
    RdsInput,
    RdsSelectList,
} from "../rds-elements";
import RdsCompAlertPopup from "../rds-comp-alert-popup";
import "./rds-comp-edition.css";
import { useTranslation } from "react-i18next";

export interface RdsCompEditionProps {
    EditionItems: any;
    features: any;
    editionName: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
    planList: any[];
    accountTwoFactorSettings: any;
    planListLabel?: string;
}
const RdsCompEdition = (props: RdsCompEditionProps) => {
    const offCanvasHandler = () => { };
    const [FormData, setFormData] = useState(props.editionName);
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [showTenantSettings, setShowTenantSettings] = useState(false);
    const { t } = useTranslation();
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setFormData(props.editionName);
    }, [props.editionName]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleChangeform = (value: any, key: any) => {
        setFormData({ ...FormData, [key]: value });
    }   

    const navtabsItems = [
        { label: t("Basics"), tablink: "#nav-home", id: 0 },
        { label: t("Features"), tablink: "#nav-profile", id: 1 },
    ];

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);
    

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(FormData);
        setInputReset(!inputReset);
        setFormData({
            editionName: "",
            plan: "",
        });
    }

    return (
        <div className="col-md-3 navsm mb-3 featureList ng-star-inserted">
            <div className="card border-undefined">
                <div className="headerClass">
                    <div className="p-3">
                        <div className="text-center mt-3">
                            <label className="fs-4 fw-bold">
                                {props.EditionItems.EditionName}
                            </label>
                            <p className="fw-medium text-muted pt-2">
                                <RdsLabel
                                    label={props.EditionItems.EditionTitle}
                                    size="10px"
                                    multiline={true}
                                ></RdsLabel>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="body">
                        <div className="pt-3">
                            <div className="text-center">
                                <h1 className="text-primary">
                                    <span>$</span>
                                    <span>{props.EditionItems.Price}</span>
                                </h1>
                                <span className="text-muted fw-medium text-black-50">
                                    {props.EditionItems.Plan}
                                </span>
                            </div>
                        </div>
                        <ul className="p-3">
                            {props.features.map((item: any) => (
                                <>
                                    <li className="fw-semibold" key={item}>{item}</li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="p-3">
                        <div className="d-flex gap-2">
                            <RdsOffcanvas
                                offcanvaswidth={650}
                                canvasTitle={t("Update Edition")}
                                onclick={offCanvasHandler}
                                placement="end"
                                offcanvasbutton={<div>
                                    <span className="position-relative btn btn-outline-primary btn-sm btn-icon p-1 rounded-pill">
                                        <RdsIcon
                                            name="pencil"
                                            height="15px"
                                            width="15px"
                                            fill={false}
                                            stroke={true} />
                                    </span>
                                </div>}
                                backDrop={false}
                                scrolling={false}
                                preventEscapeKey={false}
                                offId={"compEditionOff"}>
                                <RdsNavtabs
                                    activeNavTabId={0}
                                    navtabsItems={navtabsItems}
                                    type="tabs"
                                    isNextPressed={showTenantSettings}

                                    activeNavtabOrder={(activeNavTabId) => {
                                        setActiveNavTabId(activeNavTabId);
                                        setShowTenantSettings(false);
                                    }}
                                />
                                {activeNavTabId == "0" && showTenantSettings === false && (
                                    <>
                                        <div className="row mt-3">
                                            <div className="col-md-6 sm-p-0">
                                                <div className="form-group mb-3">
                                                    <RdsInput
                                                        required={true}
                                                        inputType="text"
                                                        label={t("Edition Name") || ""}
                                                        placeholder="Edition Name"
                                                        name="editionName"
                                                        value={FormData?.editionName}
                                                        onChange={(e: any) => handleChangeform(e.target.value, "editionName")}
                                                        id="editionName"
                                                        reset={inputReset}
                                                    ></RdsInput>
                                                </div>
                                            </div>
                                            <div className="col-md-6 sm-p-0">
                                                <div className="form-group mb-3">                                              
                                                    <RdsSelectList
                                                       id="selePla"
                                                       label="Select Plan"
                                                       onChange={(e: any) => handleChangeform(e.target.checked, "selePlan")}                                                       
                                                       selectItems={[]}
                                                    ></RdsSelectList>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 d-flex gap-3 ">
                                            <RdsButton
                                                class="me-2"
                                                tooltipTitle={""}
                                                type={"button"}
                                                label={t("Cancel") || ""}
                                                colorVariant="outline-primary"
                                                size="small"
                                                databsdismiss="offcanvas"
                                            ></RdsButton>
                                            <RdsButton
                                                class="me-2"
                                                label={t("Next") || ""}
                                                size="small"
                                                colorVariant="primary"
                                                tooltipTitle={""}
                                                onClick={(e: any) => emitSaveData(e)}
                                                type={"submit"}
                                            ></RdsButton>
                                        </div>
                                    </>
                                )}
                                {(activeNavTabId == "1" || showTenantSettings == true) && (
                                    <>
                                        {/* <RdsCompNewFeatures></RdsCompNewFeatures> */}
                                    </>
                                )}
                            </RdsOffcanvas>

                            <RdsCompAlertPopup
                                alertID={"targetId"}
                            ></RdsCompAlertPopup>
                            <div>
                                <a
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#targetId"
                                    className="position-relative btn btn-outline-danger btn-sm btn-icon p-1 rounded-pill"
                                >
                                    <RdsIcon
                                        name="delete"
                                        height="15px"
                                        width="15px"
                                        fill={false}
                                        stroke={true}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RdsCompEdition;
