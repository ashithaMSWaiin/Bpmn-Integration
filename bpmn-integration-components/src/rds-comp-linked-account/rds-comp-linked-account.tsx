import React, { useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsLinkedAccountProps { }

const RdsCompLinkedAccount = (props: RdsLinkedAccountProps) => {
    const { t } = useTranslation();
    const [userData, setUserData] = useState({
        tenancyName: "",
        userName: "",
        password: "",
    });
    const [page, setPage] = useState(false);
    const onClickHandler = () => {
        setPage((prev) => !prev);
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        const name = e.target[0].value;
        setUserData({
            ...userData,
            tenancyName: e.target[0].value,
            userName: e.target[1].value,
            password: e.target[2].value,
        });
    };

    return (
        <>
            <div className="card h-100 border-0 px-4 py-4 rounded-0 card-full-stretch">
                <div className="container-fluid">
                    <div className="d-flex">
                        {!page && (
                            <RdsButton
                                type="button"
                                icon="plus"
                                colorVariant="primary"
                                label={t("Link New Account") || ""}
                                iconFill={false}
                                iconStroke={true}
                                iconHeight="12px"
                                iconWidth="12px"
                                size="small"
                                iconColorVariant="light"
                                onClick={onClickHandler}
                                dataTestId="link-new-account"
                            ></RdsButton>
                        )}
                    </div>
                    {page && (
                        <form onSubmit={(e) => onSubmitHandler(e)}>
                            <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        label="Tenancy Name"
                                        placeholder="Tenancy Name"
                                        required={true}
                                        size="medium"
                                        name="tenancyName"
                                        dataTestId="tenancy-name"
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        label="User Name"
                                        placeholder="User Name"
                                        required={true}
                                        size="medium"
                                        name="userName"
                                        dataTestId="username"
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="password"
                                        label="Password"
                                        placeholder="Password"
                                        required={true}
                                        size="medium"
                                        name="password"
                                        dataTestId="password"
                                        showIcon= {false}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div
                                className="d-flex bottom-0 gap-2 mb-4 position-absolute"
                            >
                                <div>
                                    <RdsButton
                                        type="button"
                                        isOutline={true}
                                        colorVariant="primary"
                                        label={t("Cancel") || ""}
                                        size="small"
                                        onClick={onClickHandler}
                                        dataTestId="cancel"
                                    ></RdsButton>
                                </div>
                                <div>
                                    <RdsButton
                                        type="submit"
                                        isOutline={false}
                                        colorVariant="primary"
                                        label={t("Save") || ""}
                                        size="small"
                                        dataTestId="submit"
                                    ></RdsButton>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>

        </>
    );
};

export default RdsCompLinkedAccount;
