import React from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompUserPermissionProps {
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number | undefined;
    required?: boolean | undefined;
    sortable?: boolean | undefined;
    colWidth?: string | undefined;
    disabled?: boolean | undefined;
    isEndUserEditing?: boolean | undefined;
  }[];
  tableData: {}[];
  actions: {
    displayName: string;
    id: string;
  }[];
  pagination?: boolean;
  onActionSelection(arg: any): any;
}

const RdsCompUserPermission = (props: RdsCompUserPermissionProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <RdsButton
          type={"button"}
          colorVariant="primary"
          label={t("New User") || ""}
          icon="plus"
          iconHeight="15px"
          iconFill={false}
          iconStroke={true}
          iconWidth="15px"
          iconColorVariant="light"
          dataTestId="new-user"
        />
      </div>

      <RdsCompDatatable
        actionPosition="right"
        tableHeaders={props.tableHeaders}
        actions={props.actions}
        tableData={props.tableData}
        pagination={false}
        onActionSelection={props.onActionSelection}
      ></RdsCompDatatable>
    </div>
  );
};

export default RdsCompUserPermission;
