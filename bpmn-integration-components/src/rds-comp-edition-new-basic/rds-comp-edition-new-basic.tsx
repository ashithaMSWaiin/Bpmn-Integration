import React, { useEffect, useState } from "react";
import { RdsInput, RdsSelectList } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompEditionNewBasicProps {
    planList: any[];
    planListLabel?: string;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
    accountTwoFactorSettings: any;
}

const RdsCompEditionNewBasic = (props: RdsCompEditionNewBasicProps) => {

    const { t } = useTranslation();
    const [inputReset, setInputReset] = useState(false);
    const [twoFactorData, settwoFactorData] = useState(props.accountTwoFactorSettings);
    const handlerChangeTwoFact = (value: any, key: string) => {
        settwoFactorData({ ...twoFactorData, [key]: value });
    };

    useEffect(() => {
        settwoFactorData(props.accountTwoFactorSettings);
    }, [props.accountTwoFactorSettings]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);
    return (
        <>
            <form >
                <div className="row mt-2">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <RdsInput
                                label={t("Edition Name") || ""}
                                required={true}
                                placeholder="Edition Name"
                                inputType="text"
                                name="editionName"
                                dataTestId="edition-name"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <RdsSelectList
                                id="planLis"
                                label={props.planListLabel}
                                isDisabled={false}
                                isMultiple={false}
                                selectItems={props.planList}
                                dataTestId="plan-list"
                                selectedValue={twoFactorData?.planList}
                                onChange={(item: any) => {
                                    handlerChangeTwoFact(item.value, "planList");
                                }}
                            />
                            {/* <rds-select-list
                    [isRequired]=true  ngDefaultControl
                    name="edition" [itemList]="PlanList" required [placeholder]="'Select Plan'"
                    [(ngModel)]="editionData.editionPlan" #editionPlan="ngModel">
               

                </rds-select-list> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default RdsCompEditionNewBasic;
