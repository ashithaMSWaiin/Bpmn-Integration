import React from "react";
import { RdsButton, RdsIcon } from "../rds-elements";
import "./rds-comp-cookies-section.css";
import { useTranslation } from "react-i18next";
export interface RdsCompCookiesSectionProps {
    showDeclineButton?: boolean;
}
const RdsCompCookiesSection = (props: RdsCompCookiesSectionProps) => {
    const alertMessage =
        "This website uses cookies to ensure you get the best experience on our website.";
    const { t } = useTranslation();
    return (
        <div>
            <div className="shadow position-relative alert cookies">
                <div className="position-absolute position-close">
                    <button
                        type="button"
                        className="btn-close position-right"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="row align-items-start p-3">
                    <div className="col-md-2 p-0">
                        <div className="my-2 mx-2">
                            <RdsIcon
                            name="cookies"
                            fill={false}
                            stroke={true}
                            height="100px"
                            width="80px"
                            colorVariant="primary"
                        />
                        </div>
                    </div>
                    <div className="col-md-6 p-0 align-self-start">
                        <div className="mx-2 my-2">
                            <span>{alertMessage}</span>
                            {!props.showDeclineButton && (
                                <div className="mt-3">
                                    <RdsButton
                                        label={t("Accept") || ""}
                                        type="button"
                                        colorVariant="primary"
                                        dataTestId="accept"
                                    ></RdsButton>
                                </div>
                            )}
                        </div>
                    </div>
                    {props.showDeclineButton && (
                        <div className="col-md-3 p-0">
                            <div className="mx-2 my-2">
                                <div className="mt-3 w-50">
                                    <RdsButton
                                        label={t("Accept") || ""}
                                        type="button"
                                        block={true}
                                        colorVariant="primary"
                                        dataTestId="show-accept"
                                    ></RdsButton>
                                </div>
                                <div className="mt-3 w-50">
                                    <RdsButton
                                        class="me-2"
                                        tooltipTitle={""}
                                        type={"button"}
                                        block={true}
                                        label={t("Decline") || ""}
                                        colorVariant="outline-primary"
                                        size="small"
                                        databsdismiss="offcanvas"
                                        dataTestId="decline"
                                    ></RdsButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RdsCompCookiesSection;
